
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

// Cadastro de ONGs
app.post('/ongs', (req, res) => {
  const data = readData();
  data.ongs = data.ongs || [];
  data.ongs.push(req.body);
  writeData(data);
  res.status(201).json({ message: 'ONG cadastrada com sucesso' });
});

// Listar ONGs
app.get('/ongs', (req, res) => {
  const data = readData();
  res.json(data.ongs || []);
});

// Cadastro de Usuários
app.post('/usuarios', (req, res) => {
  const data = readData();
  data.usuarios = data.usuarios || [];
  data.usuarios.push(req.body);
  writeData(data);
  res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
});

// Rota de exemplo
app.get('/api/exemplo', (req, res) => {
  res.json({ mensagem: 'API funcionando corretamente!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
