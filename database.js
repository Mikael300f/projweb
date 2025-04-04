// projweb/database.js

const mysql = require('mysql2/promise');
require('dotenv').config();

// Criação do pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Teste de conexão
async function testarConexao() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
    console.log('✅ Conexão bem-sucedida ao banco de dados! Resultado:', rows[0].resultado);
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
  }
}

testarConexao();

module.exports = pool;
