# Grupo de recursos e computação. Em produção o alvo é o App Service; no modo
# local o módulo usa Container Apps, que o floci-az emula.

resource "azurerm_resource_group" "principal" {
  name     = "${local.nome_base}-rg"
  location = var.localizacao

  tags = local.tags

  # O emulador não aceita PATCH no grupo de recursos e devolve as tags vazias,
  # o que criaria um drift falso.
  lifecycle {
    ignore_changes = [tags]
  }
}

resource "azurerm_service_plan" "app" {
  count = var.modo_local ? 0 : 1

  name                   = "${local.nome_base}-plano"
  resource_group_name    = azurerm_resource_group.principal.name
  location               = azurerm_resource_group.principal.location
  os_type                = "Linux"
  sku_name               = var.sku_app_service
  zone_balancing_enabled = var.habilitar_zona_redundante_app

  tags = local.tags
}

resource "azurerm_linux_web_app" "app" {
  count = var.modo_local ? 0 : 1

  name                = "${local.nome_base}-app"
  resource_group_name = azurerm_resource_group.principal.name
  location            = azurerm_resource_group.principal.location
  service_plan_id     = azurerm_service_plan.app[0].id
  https_only          = true

  ftp_publish_basic_authentication_enabled       = false
  webdeploy_publish_basic_authentication_enabled = false

  identity {
    type = "SystemAssigned"
  }

  site_config {
    always_on                               = true
    health_check_path                       = "/api"
    container_registry_use_managed_identity = true

    application_stack {
      docker_image_name   = var.imagem_aplicacao
      docker_registry_url = "https://${azurerm_container_registry.principal[0].login_server}"
    }
  }

  app_settings = {
    WEBSITES_PORT = "3000"
    NODE_ENV      = "production"
    PORT          = "3000"
    HOSTNAME      = "0.0.0.0"
  }

  tags = local.tags
}

resource "azurerm_role_assignment" "app_acr_pull" {
  count = var.modo_local ? 0 : 1

  scope                = azurerm_container_registry.principal[0].id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_linux_web_app.app[0].identity[0].principal_id
}

resource "azurerm_container_app_environment" "local" {
  count = var.modo_local ? 1 : 0

  name                = "${local.nome_base}-env"
  resource_group_name = azurerm_resource_group.principal.name
  location            = azurerm_resource_group.principal.location

  tags = local.tags
}

resource "azurerm_container_app" "local" {
  count = var.modo_local ? 1 : 0

  name                         = "${local.nome_base}-app"
  resource_group_name          = azurerm_resource_group.principal.name
  container_app_environment_id = azurerm_container_app_environment.local[0].id
  revision_mode                = "Single"

  template {
    min_replicas    = 1
    max_replicas    = var.desired_count
    revision_suffix = var.sufixo_revisao

    container {
      name   = "app"
      image  = var.imagem_aplicacao
      cpu    = var.cpu_container_local
      memory = var.memoria_container_local

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

  ingress {
    external_enabled = true
    target_port      = 3000

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  tags = local.tags
}
