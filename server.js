const express = require('express');
const sequelize = require('./database/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', userRoutes);

sequelize.sync().then(() => console.log('Banco sincronizado'));

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
