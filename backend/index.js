const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Configuração mais específica do CORS para maior segurança
const corsOptions = {
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://172.19.231.181:8080'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware que aplica os cabeçalhos de permissão CORS
app.use(cors(corsOptions));

// Middleware para parsing JSON
app.use(express.json());

// Rota para verificar se o serviço está online
app.get('/', (req, res) => {
  res.json({ status: 'Backend está online e funcionando!' });
});

// Rota que fornece os dados da aplicação
app.get('/data', (req, res) => {
  const sampleData = [
    { id: 1, nome: 'Pedro Henrique', idade: 23 },
    { id: 2, nome: 'Mauro', idade: 39 }
  ];
  res.json(sampleData);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend simples rodando na porta ${port}`);
});