const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('gerenciamento_db', 'root', '3!z4@2F#9f8g', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Conectado ao MySQL'))
    .catch(err => console.error('Erro ao conectar:', err));

module.exports = sequelize;
