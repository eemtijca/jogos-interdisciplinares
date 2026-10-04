# Dados derivados e nomes padronizados dos recursos GCP.

locals {
  # O emulador guarda os recursos no projeto floci-local; em produção vale o
  # projeto informado na variável.
  projeto = var.modo_local ? "floci-local" : var.projeto

  nome_base = "${var.nome_aplicacao}-${var.ambiente}"

  # Rótulos do GCP exigem chaves em minúsculas, sem acentos e com no máximo 63
  # caracteres.
  rotulos = {
    aplicacao      = var.nome_aplicacao
    ambiente       = var.ambiente
    gerenciado_por = "terraform"
  }

  # A URL do Cloud Run só é conhecida depois da criação do serviço; no modo
  # local o endereço serve apenas como referência.
  url_aplicacao = var.modo_local ? "http://localhost:3000" : google_cloud_run_v2_service.app.uri
}
