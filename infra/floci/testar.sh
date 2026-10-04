#!/usr/bin/env bash
# Sobe os emuladores Floci, aplica o Terraform de cada nuvem, confere a saúde da
# aplicação e destrói os recursos. Uso: infra/floci/testar.sh [aws|azure|gcp|tudo]
set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$RAIZ"
export PATH="$HOME/.local/bin:$PATH"
export TF_PLUGIN_CACHE_DIR="${TF_PLUGIN_CACHE_DIR:-$HOME/.terraform.d/plugin-cache}"
mkdir -p "$TF_PLUGIN_CACHE_DIR"

NUVEM="${1:-tudo}"
MANTER="${MANTER:-false}"
CERT_AZ="$(mktemp -t floci-az-XXXXXX.crt)"
trap 'rm -f "$CERT_AZ"' EXIT

log() { printf '\n[%s] %s\n' "$(date +%H:%M:%S)" "$1" >&2; }

porta_aws="${FLOCI_AWS_PORT:-4566}"
porta_az="${FLOCI_AZ_PORT:-4577}"
porta_gcp="${FLOCI_GCP_PORT:-4588}"

subir_emuladores() {
  if curl -s -o /dev/null --max-time 3 "http://localhost:${porta_aws}/health" \
    && curl -sk -o /dev/null --max-time 3 "https://localhost:${porta_az}/health" \
    && curl -s -o /dev/null --max-time 3 "http://localhost:${porta_gcp}/health"; then
    log 'Emuladores já respondem nas portas padrão; usando as instâncias atuais.'
    return
  fi

  log 'Subindo os emuladores com docker compose.'
  docker compose -f infra/floci/compose.floci.yml up -d

  for _ in $(seq 1 60); do
    if curl -s -o /dev/null --max-time 2 "http://localhost:${porta_aws}/health" \
      && curl -sk -o /dev/null --max-time 2 "https://localhost:${porta_az}/health" \
      && curl -s -o /dev/null --max-time 2 "http://localhost:${porta_gcp}/health"; then
      return
    fi
    sleep 2
  done

  log 'Os emuladores não responderam no tempo esperado.'
  exit 1
}

garantir_imagem() {
  if docker image inspect ludus:local >/dev/null 2>&1; then
    return
  fi
  log 'Construindo a imagem ludus:local.'
  docker build -t ludus:local .
}

ip_do_conteiner() {
  docker inspect "$1" --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
}

iniciar_terraform() {
  terraform -chdir="$1" init -no-color -input=false
}

# Os emuladores oscilam em operações longas; uma segunda tentativa deixa o
# teste estável sem esconder erros de configuração.
aplicar_terraform() {
  local diretorio="$1"
  shift
  if timeout 1800 terraform -chdir="$diretorio" apply -no-color -input=false -auto-approve \
    -parallelism=4 "$@"; then
    return 0
  fi
  log "A primeira tentativa de apply em ${diretorio} falhou; repetindo."
  timeout 1800 terraform -chdir="$diretorio" apply -no-color -input=false -auto-approve \
    -parallelism=4 "$@"
}

destruir_terraform() {
  local diretorio="$1"
  shift
  if timeout 1800 terraform -chdir="$diretorio" destroy -no-color -input=false -auto-approve \
    -parallelism=4 "$@"; then
    return 0
  fi
  log "A primeira tentativa de destroy em ${diretorio} falhou; repetindo."
  timeout 1800 terraform -chdir="$diretorio" destroy -no-color -input=false -auto-approve \
    -parallelism=4 "$@"
}

# A tarefa leva alguns segundos para subir e ser registrada como alvo saudável
# no balanceador ou no proxy; a sonda repete até responder.
tentar_saude() {
  local resposta
  resposta="$("$@" 2>/dev/null || true)"
  if printf '%s' "$resposta" | grep -q '"status":"ok"'; then
    printf '%s\n' "$resposta"
    return 0
  fi
  return 1
}

esperar_saude() {
  local tentativas="${ESPERAR_TENTATIVAS:-30}"
  local resposta=''
  for _ in $(seq 1 "$tentativas"); do
    if resposta="$(tentar_saude "$@")"; then
      printf '%s\n' "$resposta"
      return 0
    fi
    sleep 5
  done
  return 1
}

testar_aws() {
  log 'Aplicando o Terraform da AWS.'
  # O provider só assina corretamente as leituras do ELB quando o endpoint
  # global está definido, como o próprio floci env exporta.
  export AWS_ENDPOINT_URL="http://localhost:${porta_aws}"
  export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-us-east-1}"
  export AWS_ACCESS_KEY_ID=test
  export AWS_SECRET_ACCESS_KEY=test
  unset AWS_SESSION_TOKEN
  local conteiner_floci="${FLOCI_AWS_CONTAINER:-}"
  if [ -z "$conteiner_floci" ]; then
    if docker inspect ludus-floci-aws >/dev/null 2>&1; then
      conteiner_floci=ludus-floci-aws
    else
      conteiner_floci=floci
    fi
  fi
  local ip_floci
  ip_floci="$(ip_do_conteiner "$conteiner_floci")"

  cat > infra/terraform/aws/terraform.tfvars.local <<EOF
modo_local         = true
ambiente           = "local"
imagem_aplicacao   = "ludus:local"
habilitar_nat      = false
desired_count      = 1
cpu_tarefa         = 256
memoria_tarefa     = 512
retencao_logs_dias = 1
habilitar_alarmes  = false
EOF

  iniciar_terraform infra/terraform/aws
  aplicar_terraform infra/terraform/aws -var-file=terraform.tfvars.local

  local alb resposta
  alb="$(terraform -chdir=infra/terraform/aws output -raw alb_dns)"
  log "Conferindo a saúde pelo balanceador ${alb}."
  if ! resposta="$(esperar_saude curl -s --max-time 10 -H "Host: ${alb}" "http://${ip_floci}/api")"; then
    log 'A aplicação não respondeu no tempo esperado.'
    exit 1
  fi
  printf '%s\n' "$resposta"

  if [ "$MANTER" != 'true' ]; then
    destruir_terraform infra/terraform/aws -var-file=terraform.tfvars.local
  fi
}

testar_azure() {
  log 'Aplicando o Terraform do Azure.'
  curl -s --max-time 10 "http://localhost:${porta_az}/_floci/tls-cert" -o "$CERT_AZ"
  export SSL_CERT_FILE="$CERT_AZ"
  local sufixo="v$(date +%s)"

  cat > infra/terraform/azure/terraform.tfvars.local <<EOF
modo_local         = true
ambiente           = "local"
imagem_aplicacao   = "ludus:local"
desired_count      = 1
retencao_logs_dias = 30
habilitar_alarmes  = false
EOF

  iniciar_terraform infra/terraform/azure
  aplicar_terraform infra/terraform/azure -var-file=terraform.tfvars.local -var="sufixo_revisao=${sufixo}"

  local fqdn resposta
  fqdn="$(curl -sk --max-time 10 -H 'Authorization: Bearer fake' \
    "https://localhost:${porta_az}/subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/ludus-local-rg/providers/Microsoft.App/containerApps/ludus-local-app?api-version=2024-03-01" \
    | python3 -c 'import json,sys; print(json.load(sys.stdin)["properties"]["configuration"]["ingress"]["fqdn"])')"
  log "Conferindo a saúde pelo Container App ${fqdn}."
  # O cliente HTTP do emulador tenta upgrade h2c e o servidor do Next.js encerra
  # o socket sem resposta; a conferência principal é feita no contêiner e o
  # ingresso é tentado antes, apenas quando o emulador consegue repassar.
  if ! resposta="$(ESPERAR_TENTATIVAS=3 esperar_saude curl -sk --max-time 10 -H "Host: ${fqdn}" "https://localhost:${porta_az}/api")"; then
    log 'O ingresso emulado não repassa a requisição; conferindo o contêiner do Container App diretamente.'
    local conteiner_ca ip_ca
    conteiner_ca="$(docker ps --format '{{.Names}}' | grep -E 'ca-ludus-local-app' | head -1)"
    ip_ca="$(ip_do_conteiner "$conteiner_ca")"
    if [ -z "$ip_ca" ]; then
      log 'Não foi possível descobrir o contêiner do Container App. Contêineres atuais:'
      docker ps --format '{{.Names}}' >&2
      exit 1
    fi
    if ! resposta="$(esperar_saude curl -s --max-time 10 "http://${ip_ca}:3000/api")"; then
      log 'A aplicação não respondeu no tempo esperado. Logs do contêiner:'
      docker logs "$conteiner_ca" 2>&1 | tail -20 >&2
      exit 1
    fi
  fi
  printf '%s\n' "$resposta"

  if [ "$MANTER" != 'true' ]; then
    destruir_terraform infra/terraform/azure -var-file=terraform.tfvars.local -var="sufixo_revisao=${sufixo}"
  fi
}

testar_gcp() {
  log 'Aplicando o Terraform do GCP.'
  export GOOGLE_OAUTH_ACCESS_TOKEN=floci

  cat > infra/terraform/gcp/terraform.tfvars.local <<'EOF'
# Arquivo gerado pelo harness do Floci; não é versionado.
modo_local        = true
ambiente          = "local"
imagem_aplicacao  = "ludus:local"
habilitar_alarmes = false
EOF

  iniciar_terraform infra/terraform/gcp
  aplicar_terraform infra/terraform/gcp -var-file=terraform.tfvars.local

  local url fqdn resposta
  url="$(terraform -chdir=infra/terraform/gcp output -raw url_servico_cloud_run)"
  fqdn="$(printf '%s' "$url" | sed -E 's#https?://([^:/]+).*#\1#')"
  log "Conferindo a saúde no Cloud Run ${fqdn}."
  # Vale o mesmo limite do Container Apps: o proxy do emulador tenta upgrade
  # h2c e o servidor do Next.js encerra o socket sem resposta.
  if ! resposta="$(ESPERAR_TENTATIVAS=3 esperar_saude curl -s --max-time 10 -H "Host: ${fqdn}" "http://localhost:${porta_gcp}/api")"; then
    log 'O ingresso emulado não repassa a requisição; conferindo o contêiner do Cloud Run diretamente.'
    local conteiner_cr ip_cr
    conteiner_cr="$(docker ps --format '{{.Names}}' | grep -E 'cloudrun-ludus-local' | head -1)"
    ip_cr="$(ip_do_conteiner "$conteiner_cr")"
    if [ -z "$ip_cr" ]; then
      log 'Não foi possível descobrir o contêiner do Cloud Run. Contêineres atuais:'
      docker ps --format '{{.Names}}' >&2
      exit 1
    fi
    if ! resposta="$(esperar_saude curl -s --max-time 10 "http://${ip_cr}:3000/api")"; then
      log 'A aplicação não respondeu no tempo esperado. Logs do contêiner:'
      docker logs "$conteiner_cr" 2>&1 | tail -20 >&2
      exit 1
    fi
  fi
  printf '%s\n' "$resposta"

  if [ "$MANTER" != 'true' ]; then
    destruir_terraform infra/terraform/gcp -var-file=terraform.tfvars.local
  fi
}

subir_emuladores
garantir_imagem

case "$NUVEM" in
  aws) testar_aws ;;
  azure) testar_azure ;;
  gcp) testar_gcp ;;
  tudo)
    testar_aws
    testar_azure
    testar_gcp
    ;;
  *)
    log "Nuvem desconhecida: ${NUVEM}. Use aws, azure, gcp ou tudo."
    exit 1
    ;;
esac

log 'Testes concluídos.'
