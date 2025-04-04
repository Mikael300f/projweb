const produtoModel = require('../models/produtoModel');

// Função de validação
function validateProduto(produto) {
  const { nome, preco, estoque } = produto;
  
  // Validações de campos obrigatórios
  if (nome.length < 3) {
    throw new Error('O nome do produto deve ter no mínimo 3 caracteres.');
  }
  if (preco <= 0) {
    throw new Error('O preço deve ser um valor positivo.');
  }
  if (estoque < 0 || !Number.isInteger(estoque)) {
    throw new Error('O estoque deve ser um número inteiro maior ou igual a zero.');
  }
}

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
    // Valida os dados antes de criar o produto
    validateProduto({ nome, preco, estoque });
    const produtoId = await produtoModel.createProduto({ nome, preco, estoque });
    res.status(201).json({ id: produtoId, nome, preco, estoque });
  } catch (err) {
    res.status(400).json({ error: err.message }); // Retorna erro se a validação falhar
  }
}

async function updateProduto(req, res) {
  const { id } = req.params;
  const { nome, preco, estoque } = req.body;
  try {
    // Valida os dados antes de atualizar o produto
    validateProduto({ nome, preco, estoque });
    await produtoModel.updateProduto(id, { nome, preco, estoque });
    res.status(200).json({ id, nome, preco, estoque });
  } catch (err) {
    res.status(400).json({ error: err.message }); // Retorna erro se a validação falhar
  }
}

async function deleteProduto(req, res) {
  const { id } = req.params;
  try {
    await produtoModel.deleteProduto(id);
    res.status(204).end(); // Produto excluído com sucesso
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
