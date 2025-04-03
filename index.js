const express = require('express');
const app = express();
const dotenv = require('dotenv');
const produtoRoutes = require('../projweb/routes/produtoRoutes');
const usuarioRoutes = require('../projweb/routes/usuarioRoutes');
const path = require('path');

dotenv.config();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.json());


app.use('/produtos', produtoRoutes);
app.use('/usuarios', usuarioRoutes);


app.get('/cadastro-produto', (req, res) => {
  res.render('cadastroProduto');
});


app.get('/cadastro-usuario', (req, res) => {
  res.render('cadastroUsuario');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
app.get('/cadastro-produto', (req, res) => {
    res.render('cadastroProduto');
  });