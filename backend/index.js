const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware que aplica os cabeçalhos de permissão CORS
app.use(cors());

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

app.listen(port, () => {
  console.log(`Backend simples rodando na porta ${port}`);
});
