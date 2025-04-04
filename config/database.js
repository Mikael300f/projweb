require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
<<<<<<< HEAD
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexão com o banco de dados bem-sucedida!'))
    .catch(err => console.error('Erro ao conectar ao banco:', err));

module.exports = sequelize;
=======
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados bem-sucedida!'))
  .catch(err => console.error('Erro ao conectar ao banco:', err));

module.exports = { sequelize };
>>>>>>> main
