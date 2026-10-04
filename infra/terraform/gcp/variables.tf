# Entradas do módulo GCP. Os padrões são seguros para produção; o arquivo
# terraform.tfvars.local.example reduz custo e usa o emulador floci-gcp.

variable "modo_local" {
  description = "Quando verdadeiro, usa o emulador floci-gcp e recursos mínimos de teste."
  type        = bool
  default     = false
}

variable "endpoint_local" {
  description = "Endereço do emulador floci-gcp no modo local."
  type        = string
  default     = "http://localhost:4588"
}

variable "projeto" {
  description = "Identificador do projeto GCP; obrigatório fora do modo local."
  type        = string
  default     = null
}

variable "regiao" {
  description = "Região GCP dos recursos."
  type        = string
  default     = "us-central1"
}

variable "ambiente" {
  description = "Nome curto do ambiente, usado no nome dos recursos."
  type        = string
  default     = "prod"
}

variable "nome_aplicacao" {
  description = "Nome da aplicação, usado no nome dos recursos."
  type        = string
  default     = "ludus"
}

variable "imagem_aplicacao" {
  description = "Imagem da aplicação no formato repositorio:tag."
  type        = string
}

variable "cpu_servico" {
  description = "CPU do contêiner do Cloud Run."
  type        = string
  default     = "1"
}

variable "memoria_servico" {
  description = "Memória do contêiner do Cloud Run."
  type        = string
  default     = "512Mi"
}

variable "min_instancias" {
  description = "Réplicas mínimas do Cloud Run em produção."
  type        = number
  default     = 0
}

variable "max_instancias" {
  description = "Réplicas máximas do Cloud Run em produção."
  type        = number
  default     = 4
}

variable "habilitar_alarmes" {
  description = "Cria o alerta de erros 5xx do Cloud Run em produção."
  type        = bool
  default     = true
}

variable "emails_alarme" {
  description = "Endereços que recebem os alertas."
  type        = list(string)
  default     = []
}

check "projeto_obrigatorio" {
  assert {
    condition     = var.modo_local || var.projeto != null
    error_message = "Fora do modo local, informe o projeto GCP."
  }
}
