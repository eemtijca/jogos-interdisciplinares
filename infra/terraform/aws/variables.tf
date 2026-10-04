# Entradas do módulo AWS. Os padrões são seguros para produção; o arquivo
# terraform.tfvars.local.example reduz custo e desliga proteções.

variable "modo_local" {
  description = "Quando verdadeiro, usa o emulador Floci e recursos mínimos de teste."
  type        = bool
  default     = false
}

variable "endpoint_floci" {
  description = "Endereço do emulador Floci para o modo local."
  type        = string
  default     = "http://localhost:4566"
}

variable "regiao" {
  description = "Região AWS dos recursos."
  type        = string
  default     = "us-east-1"
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

variable "vpc_cidr" {
  description = "Faixa CIDR da VPC dedicada."
  type        = string
  default     = "10.32.0.0/16"
}

variable "habilitar_nat" {
  description = "Cria NAT Gateway para a saída das sub-redes privadas."
  type        = bool
  default     = true
}

variable "cpu_tarefa" {
  description = "CPU da tarefa ECS em unidades de 1024."
  type        = number
  default     = 512
}

variable "memoria_tarefa" {
  description = "Memória da tarefa ECS em MiB."
  type        = number
  default     = 1024
}

variable "desired_count" {
  description = "Quantidade de tarefas ECS em produção."
  type        = number
  default     = 2
}

variable "certificado_arn" {
  description = "ARN do certificado ACM validado; obrigatório fora do modo local."
  type        = string
  default     = null
}

variable "dominio" {
  description = "Domínio público da aplicação; opcional."
  type        = string
  default     = null
}

variable "zona_hospedada_id" {
  description = "ID da zona Route 53 para o alias do domínio; opcional."
  type        = string
  default     = null
}

variable "retencao_logs_dias" {
  description = "Retenção dos logs no CloudWatch."
  type        = number
  default     = 30
}

variable "habilitar_alarmes" {
  description = "Cria alarmes básicos de disponibilidade e capacidade."
  type        = bool
  default     = true
}

variable "emails_alarme" {
  description = "Endereços que recebem os alarmes; sem eles não há inscrição no tópico."
  type        = list(string)
  default     = []
}
