const pool = require('../config/database');

// Listar todos os produtos
async function getAllProdutos() {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos');
    return rows;
  } catch (err) {
    console.error('Erro ao consultar produtos no banco de dados:', err);
    throw new Error('Erro ao consultar produtos no banco de dados');
  }
}

const { QueryTypes } = require('sequelize');  // Importe o QueryTypes
const sequelize = require('../config/database');  // Certifique-se de que está chamando a conexão corretamente

async function getProdutoById(id) {
  try {
    const produto = await sequelize.query(
      'SELECT * FROM produtos WHERE id = :id',
      { replacements: { id }, type: QueryTypes.SELECT }
    );

    console.log('Resultado da consulta:', produto);  // Verifique o resultado

    if (!produto.length) {
      return null;
    }
    return produto[0];
  } catch (err) {
    console.error(`Erro ao consultar produto com ID ${id}:`, err);
    throw new Error('Erro ao consultar produto');
  }
}


async function createProduto(produto) {
  const { nome, preco, estoque } = produto;
  try {
    console.log('Criando produto no banco:', produto);  // Log antes da query
    const [result] = await pool.execute(
      'INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)',
      [nome, preco, estoque]
    );
    return result.insertId;  // Retorna o ID do novo produto
  } catch (err) {
    console.error('Erro ao criar produto no banco:', err);
    throw new Error('Erro ao criar produto no banco');
  }
}


// Atualizar um produto existente
async function updateProduto(id, produto) {
  const { nome, preco, estoque } = produto;
  try {
    const [result] = await pool.query('UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?', [nome, preco, estoque, id]);
    if (result.affectedRows === 0) {
      throw new Error('Produto não encontrado ou não alterado');
    }
    return result;
  } catch (err) {
    console.error(`Erro ao atualizar produto com ID ${id}:`, err);
    throw new Error('Erro ao atualizar produto');
  }
}

// Deletar um produto
async function deleteProduto(id) {
  try {
    const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      throw new Error('Produto não encontrado');
    }
  } catch (err) {
    console.error(`Erro ao deletar produto com ID ${id}:`, err);
    throw new Error('Erro ao excluir produto');
  }
}

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
};