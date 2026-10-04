# Saídas usadas pelos scripts de implantação.

output "url_aplicacao" {
  description = "URL pública da aplicação."
  value       = local.url_aplicacao
}

output "repositorio_imagem" {
  description = "Login server do ACR; vazio no modo local."
  value       = var.modo_local ? "" : azurerm_container_registry.principal[0].login_server
}

output "id_container_app" {
  description = "Identificador do Container App no modo local."
  value       = var.modo_local ? azurerm_container_app.local[0].id : ""
}
