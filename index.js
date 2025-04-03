const express = require('express');
const app = express();

// Porta onde o servidor irá rodar
const PORT = 3000;

// Middleware para lidar com requisições JSON
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
    res.send('Servidor Express está funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
