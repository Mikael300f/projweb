const { DataTypes, QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'produtos',
  timestamps: false
});

async function getAllProdutos() {
  try {
    return await Produto.findAll();
  } catch (err) {
    console.error('Erro ao consultar produtos:', err);
    throw new Error('Erro ao consultar produtos');
  }
}

async function getProdutoById(id) {
  try {
    const produto = await Produto.findByPk(id);
    return produto ? produto : null;
  } catch (err) {
    console.error(`Erro ao buscar produto com ID ${id}:`, err);
    throw new Error('Erro ao buscar produto');
  }
}

async function createProduto({ nome, preco, estoque }) {
  try {
    console.log('📦 Criando produto:', { nome, preco, estoque });
    const produto = await Produto.create({ nome, preco, estoque });
    return produto;
  } catch (err) {
    console.error('❌ Erro ao criar produto:', err);
    throw new Error('Erro ao criar produto');
  }
}

async function updateProduto(id, { nome, preco, estoque }) {
  try {
    const produto = await Produto.findByPk(id);
    if (!produto) throw new Error('Produto não encontrado');

    produto.nome = nome;
    produto.preco = preco;
    produto.estoque = estoque;
    await produto.save();

    return produto;
  } catch (err) {
    console.error(`Erro ao atualizar produto com ID ${id}:`, err);
    throw new Error('Erro ao atualizar produto');
  }
}

async function deleteProduto(id) {
  try {
    const produto = await Produto.findByPk(id);
    if (!produto) throw new Error('Produto não encontrado');

    await produto.destroy();
  } catch (err) {
    console.error(`Erro ao deletar produto com ID ${id}:`, err);
    throw new Error('Erro ao excluir produto');
  }
}

module.exports = {
  Produto,
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto
};