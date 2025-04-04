const pool = require('../config/database');

async function getAllProdutos() {
  const [rows] = await pool.query('SELECT * FROM produtos');
  return rows;
}

async function getProdutoById(id) {
  const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
  return rows[0];
}

async function createProduto(produto) {
  const { nome, preco, estoque } = produto;
  const [result] = await pool.query('INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)', [nome, preco, estoque]);
  return result.insertId;
}

async function updateProduto(id, produto) {
  const { nome, preco, estoque } = produto;
  await pool.query('UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?', [nome, preco, estoque, id]);
}

async function deleteProduto(id) {
  await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
}

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
};