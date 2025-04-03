require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./config/database');

const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

// Middleware para JSON
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api', produtoRoutes);
app.use('/api', usuarioRoutes);

// Sincronizar banco de dados e iniciar o servidor
sequelize.sync()
  .then(() => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
  })
  .catch(err => console.error('Erro ao sincronizar banco:', err));