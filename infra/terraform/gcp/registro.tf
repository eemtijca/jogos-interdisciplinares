# Registro de imagens de produção. No modo local a imagem vem do Docker da
# máquina e o Artifact Registry não é criado (o emulador não o suporta).

resource "google_artifact_registry_repository" "app" {
  count = var.modo_local ? 0 : 1

  project       = local.projeto
  location      = var.regiao
  repository_id = local.nome_base
  description   = "Imagens da aplicação ${var.nome_aplicacao}"
  format        = "DOCKER"

  cleanup_policies {
    id     = "manter-recentes"
    action = "KEEP"

    most_recent_versions {
      keep_count = 10
    }
  }

  cleanup_policies {
    id     = "expirar-antigas"
    action = "DELETE"

    condition {
      tag_state  = "ANY"
      older_than = "2592000s"
    }
  }

  labels = local.rotulos
}
