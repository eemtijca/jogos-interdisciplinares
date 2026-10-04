# Dados derivados e nomes padronizados dos recursos.

data "aws_availability_zones" "disponiveis" {
  state = "available"
}

locals {
  endpoint_floci = var.endpoint_floci

  tags = {
    Aplicacao     = var.nome_aplicacao
    Ambiente      = var.ambiente
    GerenciadoPor = "terraform"
  }

  nome_base = "${var.nome_aplicacao}-${var.ambiente}"

  zonas = slice(data.aws_availability_zones.disponiveis.names, 0, 2)

  subredes_publicas = [
    for indice, zona in local.zonas : cidrsubnet(var.vpc_cidr, 8, indice)
  ]

  subredes_privadas = [
    for indice, zona in local.zonas : cidrsubnet(var.vpc_cidr, 8, indice + 10)
  ]

  contagem_tarefas = var.modo_local ? 1 : var.desired_count

  habilitar_nat = var.modo_local ? false : var.habilitar_nat

  url_aplicacao = var.dominio != null ? "https://${var.dominio}" : (
    var.modo_local ? "http://localhost:3000" : "https://${aws_lb.principal.dns_name}"
  )
}
