const produtoModel = require('../models/produtoModel');

async function getAllProdutos(req, res) {
  try {
    const produtos = await produtoModel.getAllProdutos();
    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
}

async function getProdutoById(req, res) {
  const { id } = req.params;
  try {
    const produto = await produtoModel.getProdutoById(id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter produto' });
  }
}

async function createProduto(req, res) {
  const { nome, preco, estoque } = req.body;
  try {
    const produtoId = await produtoModel.createProduto({ nome, preco, estoque });
    res.status(201).json({ id: produtoId, nome, preco, estoque });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
}

async function updateProduto(req, res) {
  const { id } = req.params;
  const { nome, preco, estoque } = req.body;
  try {
    await produtoModel.updateProduto(id, { nome, preco, estoque });
    res.status(200).json({ id, nome, preco, estoque });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
}

async function deleteProduto(req, res) {
  const { id } = req.params;
  try {
    await produtoModel.deleteProduto(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
}

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto
};