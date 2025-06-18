# Comandos para Docker Swarm

## 1. Inicializar o Docker Swarm (no nó manager)
```bash
docker swarm init --advertise-addr <IP_DO_MANAGER>
```

## 2. Adicionar nós worker ao cluster
Execute o comando que aparece após o `docker swarm init` nos outros nós:
```bash
docker swarm join --token <TOKEN> <IP_DO_MANAGER>:2377
```

## 3. Verificar os nós do cluster
```bash
docker node ls
```

## 4. Deploy da aplicação no Swarm
```bash
docker stack deploy -c docker-compose.swarm.yml app-stack
```

## 5. Verificar os serviços
```bash
docker service ls
docker stack services app-stack
```

## 6. Verificar as tarefas/containers
```bash
docker service ps app-stack_backend
docker service ps app-stack_frontend
```

## 7. Escalar serviços (opcional)
```bash
docker service scale app-stack_backend=5
docker service scale app-stack_frontend=3
```

## 8. Atualizar serviços
```bash
docker service update --image pedrobachaalani1701/trabalho-backend:6.0 app-stack_backend
```

## 9. Remover a stack
```bash
docker stack rm app-stack
```

## 10. Sair do Swarm (se necessário)
```bash
# No manager
docker swarm leave --force

# Nos workers
docker swarm leave
```

## Monitoramento

### Visualizar logs
```bash
docker service logs app-stack_backend
docker service logs app-stack_frontend
```

### Inspecionar serviços
```bash
docker service inspect app-stack_backend
docker service inspect app-stack_frontend
```