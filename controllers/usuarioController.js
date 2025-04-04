const { getAllUsuario, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } = require('../models/usuarioModel');

function validateUsuario(usuario) {
  const { nome, email, senha } = usuario;
  
  if (!nome || nome.length < 3) {
    throw new Error('O nome do usuário deve ter no mínimo 3 caracteres.');
  }
  if (!email || !email.includes('@')) {
    throw new Error('O e-mail do usuário deve ser válido.');
  }
  if (!senha || senha.length < 6) {
    throw new Error('A senha deve ter pelo menos 6 caracteres.');
  }
}

async function getAllUsuarios(req, res) {
  try {
    const usuarios = await getAllUsuario();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter usuários' });
  }
}

async function getUsuario(req, res) {
  const { id } = req.params;
  try {
    const usuario = await getUsuarioById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter usuário' });
  }
}

async function createUsuarioHandler(req, res) {
  const { nome, email, senha } = req.body;
  try {
    validateUsuario({ nome, email, senha });
    const usuarioId = await createUsuario({ nome, email, senha });
    res.status(201).json({ id: usuarioId, nome, email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateUsuarioHandler(req, res) {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    validateUsuario({ nome, email, senha });
    await updateUsuario(id, { nome, email, senha });
    res.status(200).json({ id, nome, email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteUsuarioHandler(req, res) {
  const { id } = req.params;
  try {
    await deleteUsuario(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
}

module.exports = {
  getAllUsuarios,
  getUsuario,
  createUsuarioHandler,
  updateUsuarioHandler,
  deleteUsuarioHandler
};