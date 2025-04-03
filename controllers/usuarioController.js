const produtoModel = require('../model/usuarioModel');

async function getAllUsuario(req, res) {
  const usuario = await produtoModel.getAllUsuario();
  res.json(usuario);
}

async function getUsuarioById(req, res) {
  const usuario = await usuarioModel.getUsuarioById(req.params.id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send('usuario não encontrado');
  }
}

async function createUsuario(req, res) {
  const { nome, idade } = req.body;
  if (!nome || nome.length < 3 || idade <= 0) {
    return res.status(400).send('Dados inválidos');
  }
  const id = await usuarioModel.createUsuario(req.body);
  res.status(201).json({ id });
}

async function updateUsuario(req, res) {
  const { nome, idade} = req.body;
  if (!nome || nome.length < 3 || idade <= 0) {
    return res.status(400).send('Dados inválidos');
  }
  await usuarioModel.updateUsuario(req.params.id, req.body);
  res.send('Usuário atualizado');
}

async function deleteUsuario(req, res) {
  await usuarioModel.deleteUsuario(req.params.id);
  res.send('Usuário deletado');
}

module.exports = {
  getAllUsuario,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};