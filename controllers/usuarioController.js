const usuarioModel = require('../models/usuarioModel');

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
    const usuarioId = await usuarioModel.createUsuario({ nome, idade });
    res.status(201).json({ id: usuarioId, nome, idade });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

async function updateUsuario(req, res) {
  const { id } = req.params;
  const { nome, idade } = req.body;
  try {
    await usuarioModel.updateUsuario(id, { nome, idade });
    res.status(200).json({ id, nome, idade });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
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