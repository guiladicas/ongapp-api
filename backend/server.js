const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbPath = './db.json';

function readData() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

app.get('/associados', (req, res) => {
  const data = readData();
  res.json(data.associados || []);
});

app.post('/associados', (req, res) => {
  const data = readData();
  data.associados = data.associados || [];
  data.associados.push(req.body);
  writeData(data);
  res.status(201).json({ message: 'Associado adicionado' });
});

// Rota de exemplo
app.get('/api/exemplo', (req, res) => {
  res.json({ mensagem: 'API funcionando corretamente!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
