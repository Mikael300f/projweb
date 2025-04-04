const usuarioModel = require('../models/usuarioModel');

function validateUsuario(usuario) {
  const { nome, idade } = usuario;
  
  if (nome.length < 3) {
    throw new Error('O nome do usuário deve ter no mínimo 3 caracteres.');
  }
  if (idade <= 0) {
    throw new Error('A idade deve ser um número positivo.');
  }
}

async function getAllUsuario(req, res) {
  try {
    const usuarios = await usuarioModel.getAllUsuario();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter usuários' });
  }
}

async function getUsuarioById(req, res) {
  const { id } = req.params;
  try {
    const usuario = await usuarioModel.getUsuarioById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter usuário' });
  }
}

async function createUsuario(req, res) {
  const { nome, idade } = req.body;
  try {
    validateUsuario({ nome, idade });
    const usuarioId = await usuarioModel.createUsuario({ nome, idade });
    res.status(201).json({ id: usuarioId, nome, idade });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateUsuario(req, res) {
  const { id } = req.params;
  const { nome, idade } = req.body;
  try {
    validateUsuario({ nome, idade });
    await usuarioModel.updateUsuario(id, { nome, idade });
    res.status(200).json({ id, nome, idade });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteUsuario(req, res) {
  const { id } = req.params;
  try {
    await usuarioModel.deleteUsuario(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
}

module.exports = {
  getAllUsuario,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};