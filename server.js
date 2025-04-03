require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');

const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
app.use(express.json());

app.use('/api', produtoRoutes);
app.use('/api', usuarioRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
}).catch(err => console.error('Erro ao sincronizar banco:', err));
