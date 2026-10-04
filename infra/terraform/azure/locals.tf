# Dados derivados e nomes padronizados dos recursos Azure.

resource "random_string" "sufixo" {
  length  = 4
  upper   = false
  special = false
  numeric = true
}

locals {
  nome_base = "${var.nome_aplicacao}-${var.ambiente}"

  nome_curto = lower(replace("${var.nome_aplicacao}${var.ambiente}", "-", ""))

  # O ACR exige um nome globalmente único, só com letras minúsculas e números.
  nome_acr = substr(lower(replace("${local.nome_curto}${random_string.sufixo.result}acr", "-", "")), 0, 50)

  tags = {
    Aplicacao     = var.nome_aplicacao
    Ambiente      = var.ambiente
    GerenciadoPor = "terraform"
  }

  # O hostname padrão do App Service segue o nome do recurso: <nome>.azurewebsites.net.
  url_aplicacao = var.modo_local ? "http://localhost:3000" : (
    var.dominio != null ? "https://${var.dominio}" : "https://${local.nome_base}-app.azurewebsites.net"
  )
}
