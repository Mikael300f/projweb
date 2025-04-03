const produtoModel = require('../model/produtoModel');

async function getAllProdutos(req, res) {
  const produtos = await produtoModel.getAllProdutos();
  res.json(produtos);
}

async function getProdutoById(req, res) {
  const produto = await produtoModel.getProdutoById(req.params.id);
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).send('Produto não encontrado');
  }
}

async function createProduto(req, res) {
  const { nome, preco, estoque } = req.body;
  if (!nome || nome.length < 3 || preco <= 0 || estoque < 0) {
    return res.status(400).send('Dados inválidos');
  }
  const id = await produtoModel.createProduto(req.body);
  res.status(201).json({ id });
}

async function updateProduto(req, res) {
  const { nome, preco, estoque } = req.body;
  if (!nome || nome.length < 3 || preco <= 0 || estoque < 0) {
    return res.status(400).send('Dados inválidos');
  }
  await produtoModel.updateProduto(req.params.id, req.body);
  res.send('Produto atualizado');
}

async function deleteProduto(req, res) {
  await produtoModel.deleteProduto(req.params.id);
  res.send('Produto deletado');
}

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
};