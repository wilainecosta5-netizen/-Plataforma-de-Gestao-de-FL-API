const express = require('express');
const app = express();
const PORT = 3000;

// Permite receber JSON no corpo das requisições
app.use(express.json());

// "Banco de dados" em memória
let tarefas = [
  { id: 1, titulo: 'Estudar Node.js', concluido: false },
];
let proximoId = 2;

// Rota inicial
app.get('/', (req, res) => {
  res.json({ mensagem: 'API funcionando!' });
});

// Listar todas
app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

// Buscar uma por id
app.get('/tarefas/:id', (req, res) => {
  const tarefa = tarefas.find(t => t.id === Number(req.params.id));
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrado' });
  res.json(tarefa);
});

// Criar
app.post('/tarefas', (req, res) => {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ erro: 'O campo "titulo" é obrigatório' });

  const nova = { id: proximoId++, titulo, concluido: false };
  tarefas.push(nova);
  res.status(201).json(nova);
});

// Atualizar
app.put('/tarefas/:id', (req, res) => {
  const tarefa = tarefas.find(t => t.id === Number(req.params.id));
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrado' });

  const { titulo, concluido } = req.body;
  if (titulo !== undefined) tarefa.titulo = titulo;
  if (concluido !== undefined) tarefa.concluido = concluido;
  res.json(tarefa);
});

// Deletar
app.delete('/tarefas/:id', (req, res) => {
  const indice = tarefas.findIndex(t => t.id === Number(req.params.id));
  if (indice === -1) return res.status(404).json({ erro: 'Tarefa não encontrado' });

  tarefas.splice(indice, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});