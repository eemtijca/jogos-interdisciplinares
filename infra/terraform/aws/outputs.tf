# Saídas usadas pelos scripts de implantação e pelos demais módulos.

output "url_aplicacao" {
  description = "URL pública da aplicação."
  value       = local.url_aplicacao
}

output "alb_dns" {
  description = "Nome DNS do balanceador."
  value       = aws_lb.principal.dns_name
}

output "repositorio_imagem" {
  description = "URL do repositório ECR; vazio no modo local."
  value       = var.modo_local ? "" : aws_ecr_repository.app[0].repository_url
}

output "cluster_ecs" {
  description = "Nome do cluster ECS."
  value       = aws_ecs_cluster.app.name
}

output "servico_ecs" {
  description = "Nome do serviço ECS."
  value       = aws_ecs_service.app.name
}
