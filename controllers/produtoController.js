const produtoModel = require('../models/produtoModel');

function validateProduto(produto) {
  const { nome, preco, estoque } = produto;

  if (!nome || nome.length < 3) {
    throw new Error('O nome do produto deve ter no mínimo 3 caracteres.');
  }
  if (preco == null || preco <= 0) {
    throw new Error('O preço deve ser um valor positivo.');
  }
  if (estoque == null || estoque < 0 || !Number.isInteger(estoque)) {
    throw new Error('O estoque deve ser um número inteiro maior ou igual a zero.');
  }
}

async function getAllProdutos(req, res) {
  try {
    const produtos = await produtoModel.getAllProdutos();
    res.status(200).json(produtos);
  } catch (err) {
    console.error('Erro ao obter produtos:', err);
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
}

async function getProdutoById(req, res) {
  let { id } = req.params;

  console.log('ID recebido:', id);  // Depuração

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  id = Number(id); // Converte o ID para número antes de enviar ao banco

  try {
    const produto = await produtoModel.getProdutoById(id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (err) {
    console.error(`Erro ao consultar produto com ID ${id}:`, err);
    res.status(500).json({ error: 'Erro ao consultar produto' });
  }
}

async function createProduto(req, res) {
  console.log('Dados recebidos:', req.body); // Verificar os dados recebidos

  const { nome, preco, estoque } = req.body;
  try {
    validateProduto({ nome, preco, estoque }); // Validação dos campos
    const produtoId = await produtoModel.createProduto({ nome, preco, estoque });
    res.status(201).json({ id: produtoId, nome, preco, estoque });
  } catch (err) {
    console.error('Erro ao criar produto:', err);
    res.status(400).json({ error: err.message }); // Retorna mensagem de erro específica
  }
}

async function updateProduto(req, res) {
  const { id } = req.params;
  const { nome, preco, estoque } = req.body;
  try {
    validateProduto({ nome, preco, estoque });
    await produtoModel.updateProduto(id, { nome, preco, estoque });
    res.status(200).json({ id, nome, preco, estoque });
  } catch (err) {
    console.error(`Erro ao atualizar produto com ID ${id}:`, err);
    res.status(400).json({ error: err.message });
  }
}

async function deleteProduto(req, res) {
  const { id } = req.params;
  try {
    const produto = await produtoModel.getProdutoById(id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    await produtoModel.deleteProduto(id);
    res.status(204).end();
  } catch (err) {
    console.error(`Erro ao excluir produto com ID ${id}:`, err);
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
}

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
};