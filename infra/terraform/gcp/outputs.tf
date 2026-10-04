# Saídas usadas pelos scripts de implantação e pelos demais módulos.

output "url_aplicacao" {
  description = "URL pública da aplicação."
  value       = local.url_aplicacao
}

output "url_servico_cloud_run" {
  description = "URL gerada pelo Cloud Run para o serviço."
  value       = google_cloud_run_v2_service.app.uri
}

output "repositorio_imagem" {
  description = "Endereço do Artifact Registry; vazio no modo local."
  value       = var.modo_local ? "" : "${var.regiao}-docker.pkg.dev/${local.projeto}/${local.nome_base}"
}

output "servico_cloud_run" {
  description = "Nome do serviço Cloud Run."
  value       = google_cloud_run_v2_service.app.name
}

output "conta_servico" {
  description = "Email da service account da aplicação."
  value       = google_service_account.app.email
}
