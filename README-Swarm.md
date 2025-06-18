# Docker Swarm - Aplicação Distribuída

Esta aplicação foi configurada para rodar em um cluster Docker Swarm com alta disponibilidade e balanceamento de carga.

## Arquitetura

- **Backend**: 3 réplicas distribuídas pelos nós worker
- **Frontend**: 2 réplicas distribuídas pelos nós worker
- **Rede**: Overlay network para comunicação entre serviços
- **Load Balancing**: Automático via Docker Swarm

## Configuração do Cluster

### Pré-requisitos
- Docker instalado em todos os nós
- Portas abertas: 2377 (cluster management), 7946 (node communication), 4789 (overlay network)

### Passos para Deploy

1. **Inicializar o Swarm no nó manager:**
   ```bash
   docker swarm init --advertise-addr <IP_DO_MANAGER>
   ```

2. **Adicionar nós worker:**
   Execute o comando fornecido pelo `swarm init` nos outros nós.

3. **Fazer deploy da aplicação:**
   ```bash
   docker stack deploy -c docker-compose.swarm.yml app-stack
   ```

4. **Verificar o status:**
   ```bash
   docker service ls
   docker stack services app-stack
   ```

## Características do Swarm

### Alta Disponibilidade
- Múltiplas réplicas de cada serviço
- Redistribuição automática em caso de falha de nó
- Restart automático de containers com falha

### Balanceamento de Carga
- Load balancing automático entre réplicas
- Roteamento de mesh integrado
- Distribuição de carga via round-robin

### Atualizações Rolling
- Atualizações sem downtime
- Rollback automático em caso de falha
- Controle de paralelismo nas atualizações

## Monitoramento

### Comandos Úteis
```bash
# Status dos nós
docker node ls

# Status dos serviços
docker service ls

# Logs dos serviços
docker service logs app-stack_backend
docker service logs app-stack_frontend

# Detalhes das tarefas
docker service ps app-stack_backend
```

## Escalabilidade

Para escalar os serviços:
```bash
# Aumentar réplicas do backend
docker service scale app-stack_backend=5

# Aumentar réplicas do frontend
docker service scale app-stack_frontend=4
```

## Acesso à Aplicação

- **Frontend**: http://localhost:8080 ou http://<IP_QUALQUER_NO>:8080
- **Backend**: http://localhost:3001 ou http://<IP_QUALQUER_NO>:3001

O Docker Swarm automaticamente roteia as requisições para qualquer nó do cluster.