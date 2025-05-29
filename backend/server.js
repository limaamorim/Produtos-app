require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Configurações básicas
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Conexão com MongoDB
// Conexão com MongoDB (versão atualizada)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB conectado com sucesso'))
.catch(err => {
  console.error('Erro na conexão com MongoDB:', err);
  process.exit(1);
});

// Rotas
const produtosRoutes = require('./routes/produtos');
app.use('/produtos', produtosRoutes);

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocorreu um erro no servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));