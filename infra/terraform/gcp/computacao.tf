# Service account dedicada, serviço Cloud Run v2 e a ligação de IAM do
# registro. No modo local o serviço roda com variáveis de ambiente simples; em
# produção usa a imagem do Artifact Registry.

resource "google_service_account" "app" {
  account_id   = substr("${local.nome_base}-app", 0, 30)
  display_name = "Aplicação ${var.nome_aplicacao}"
  project      = local.projeto
}

resource "google_cloud_run_v2_service" "app" {
  name                = local.nome_base
  project             = local.projeto
  location            = var.regiao
  ingress             = "INGRESS_TRAFFIC_ALL"
  deletion_protection = var.modo_local ? false : true

  template {
    service_account = google_service_account.app.email

    dynamic "scaling" {
      for_each = var.modo_local ? [] : [1]

      content {
        min_instance_count = var.min_instancias
        max_instance_count = var.max_instancias
      }
    }

    containers {
      image = var.imagem_aplicacao

      ports {
        container_port = 3000
      }

      resources {
        limits = {
          cpu    = var.cpu_servico
          memory = var.memoria_servico
        }
      }

      env {
        name  = "NODE_ENV"
        value = "production"
      }

      env {
        name  = "PORT"
        value = "3000"
      }

      env {
        name  = "HOSTNAME"
        value = "0.0.0.0"
      }
    }
  }
}

resource "google_artifact_registry_repository_iam_member" "app" {
  count = var.modo_local ? 0 : 1

  project    = local.projeto
  location   = var.regiao
  repository = google_artifact_registry_repository.app[0].name
  role       = "roles/artifactregistry.reader"
  member     = "serviceAccount:${google_service_account.app.email}"
}
