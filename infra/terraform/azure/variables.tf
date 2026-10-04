# Entradas do módulo Azure. Os padrões valem para produção; o arquivo local
# reduz custo e usa os serviços que o floci-az emula.

variable "modo_local" {
  description = "Quando verdadeiro, usa o emulador floci-az e Container Apps."
  type        = bool
  default     = false
}

variable "endpoint_local" {
  description = "Host do emulador floci-az para o modo local."
  type        = string
  default     = "localhost:4577"
}

variable "localizacao" {
  description = "Região Azure dos recursos."
  type        = string
  default     = "brazilsouth"
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

variable "sku_acr" {
  description = "SKU do Azure Container Registry."
  type        = string
  default     = "Standard"
}

variable "sku_app_service" {
  description = "SKU do plano do App Service em produção."
  type        = string
  default     = "P1v3"
}

variable "habilitar_zona_redundante_app" {
  description = "Distribui o App Service em zonas de disponibilidade."
  type        = bool
  default     = false
}

variable "desired_count" {
  description = "Réplicas do Container Apps no modo local."
  type        = number
  default     = 1
}

variable "sufixo_revisao" {
  description = "Sufixo da revisão do Container Apps; troque para forçar uma revisão nova."
  type        = string
  default     = "v1"
}

variable "cpu_container_local" {
  description = "CPU do Container App no modo local."
  type        = number
  default     = 0.5
}

variable "memoria_container_local" {
  description = "Memória do Container App no modo local."
  type        = string
  default     = "1Gi"
}

variable "dominio" {
  description = "Domínio público do App Service; opcional."
  type        = string
  default     = null
}

variable "retencao_logs_dias" {
  description = "Retenção do workspace do Log Analytics."
  type        = number
  default     = 30
}

variable "habilitar_alarmes" {
  description = "Cria alertas básicos de disponibilidade e capacidade."
  type        = bool
  default     = true
}

variable "emails_alarme" {
  description = "Endereços que recebem os alertas."
  type        = list(string)
  default     = []
}
