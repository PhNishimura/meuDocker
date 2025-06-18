const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Configuração CORS mais permissiva
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false
}));

// Middleware para parsing JSON
app.use(express.json());

// Log de todas as requisições para debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin || 'none'}`);
  next();
});

// Rota para verificar se o serviço está online
app.get('/', (req, res) => {
  console.log('Requisição recebida na rota /');
  res.json({ 
    status: 'Backend está online e funcionando!',
    timestamp: new Date().toISOString(),
    port: port,
    hostname: require('os').hostname()
  });
});

// Rota que fornece os dados da aplicação
app.get('/data', (req, res) => {
  console.log('Requisição recebida na rota /data');
  const sampleData = [
    { id: 1, nome: 'Pedro Henrique', idade: 23 },
    { id: 2, nome: 'Mauro', idade: 39 },
    { id: 3, nome: 'Ana Silva', idade: 28 },
    { id: 4, nome: 'Carlos Santos', idade: 35 }
  ];
  res.json(sampleData);
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Tratamento de erro global
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Backend rodando na porta ${port}`);
  console.log(`Servidor iniciado em: ${new Date().toISOString()}`);
  console.log(`PID: ${process.pid}`);
  console.log(`Hostname: ${require('os').hostname()}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Recebido SIGTERM, fechando servidor...');
  server.close(() => {
    console.log('Servidor fechado');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Recebido SIGINT, fechando servidor...');
  server.close(() => {
    console.log('Servidor fechado');
    process.exit(0);
  });
});