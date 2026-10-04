# Roles, cluster, definição e serviço ECS, balanceador e listeners.

resource "aws_iam_role" "execucao" {
  name = "${local.nome_base}-execucao"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })

  tags = merge(local.tags, { Name = "${local.nome_base}-execucao" })
}

resource "aws_iam_role_policy_attachment" "execucao_ecs" {
  role       = aws_iam_role.execucao.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# A aplicação não usa banco, cache, storage nem segredos: a tarefa só precisa da
# role de execução para puxar a imagem e gravar logs.
resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/${local.nome_base}"
  retention_in_days = var.retencao_logs_dias

  tags = merge(local.tags, { Name = "/ecs/${local.nome_base}" })
}

resource "aws_ecs_cluster" "app" {
  name = local.nome_base

  tags = merge(local.tags, { Name = local.nome_base })
}

resource "aws_ecs_task_definition" "app" {
  family                   = local.nome_base
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = tostring(var.cpu_tarefa)
  memory                   = tostring(var.memoria_tarefa)
  execution_role_arn       = aws_iam_role.execucao.arn

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  container_definitions = jsonencode([
    {
      name      = "app"
      image     = var.imagem_aplicacao
      essential = true

      portMappings = [{
        containerPort = 3000
        hostPort      = 3000
        protocol      = "tcp"
      }]

      environment = [
        { name = "NODE_ENV", value = "production" },
        { name = "PORT", value = "3000" },
        { name = "HOSTNAME", value = "0.0.0.0" },
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.app.name
          awslogs-region        = var.regiao
          awslogs-stream-prefix = "app"
        }
      }
    }
  ])

  tags = merge(local.tags, { Name = local.nome_base })
}

resource "aws_lb" "principal" {
  name               = "${local.nome_base}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.publica[*].id

  enable_deletion_protection = var.modo_local ? false : true

  tags = merge(local.tags, { Name = "${local.nome_base}-alb" })
}

resource "aws_lb_target_group" "app" {
  name        = "${local.nome_base}-app"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.principal.id
  target_type = "ip"

  health_check {
    path                = "/api"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }

  tags = merge(local.tags, { Name = "${local.nome_base}-app" })
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.principal.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = var.modo_local ? "forward" : "redirect"
    target_group_arn = var.modo_local ? aws_lb_target_group.app.arn : null

    dynamic "redirect" {
      for_each = var.modo_local ? [] : [1]

      content {
        port        = "443"
        protocol    = "HTTPS"
        status_code = "HTTP_301"
      }
    }
  }

  lifecycle {
    precondition {
      condition     = var.modo_local || var.certificado_arn != null
      error_message = "Fora do modo local, informe certificado_arn: o balanceador público não encaminha HTTP sem TLS."
    }
  }

  tags = merge(local.tags, { Name = "${local.nome_base}-http" })
}

resource "aws_lb_listener" "https" {
  count = var.certificado_arn == null ? 0 : 1

  load_balancer_arn = aws_lb.principal.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = var.certificado_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }

  tags = merge(local.tags, { Name = "${local.nome_base}-https" })
}

resource "aws_ecs_service" "app" {
  name            = local.nome_base
  cluster         = aws_ecs_cluster.app.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = local.contagem_tarefas
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.privada[*].id
    security_groups  = [aws_security_group.tarefas.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "app"
    container_port   = 3000
  }

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  health_check_grace_period_seconds = 60
  wait_for_steady_state             = var.modo_local ? false : true

  tags = merge(local.tags, { Name = local.nome_base })

  depends_on = [aws_lb_listener.http]
}

resource "aws_route53_record" "app" {
  count = var.dominio != null && var.zona_hospedada_id != null ? 1 : 0

  zone_id = var.zona_hospedada_id
  name    = var.dominio
  type    = "A"

  alias {
    name                   = aws_lb.principal.dns_name
    zone_id                = aws_lb.principal.zone_id
    evaluate_target_health = true
  }
}
