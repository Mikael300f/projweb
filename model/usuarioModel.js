const pool = require('../database');

async function getAllUsuario() {
  const [rows] = await pool.query('SELECT * FROM USUARIOS');
  return rows;
}

async function getUsuarioById(id) {
  const [rows] = await pool.query('SELECT * FROM USUARIOS WHERE id = ?', [id]);
  return rows[0];
}

async function createUsuario(usuario) {
  const { nome, preco, estoque } = usuario;
  const [result] = await pool.query('INSERT INTO USUARIOS (nome, idade) VALUES (?, ?)', [nome, idade]);
  return result.insertId;
}

async function updateUsuario(id, usuario) {
  const { nome, idade } = usuario;
  await pool.query('UPDATE USUARIOS SET nome = ? WHERE id = ?', [nome, idade, id]);
}

async function deleteUsuario(id) {
  await pool.query('DELETE FROM USUARIOS WHERE id = ?', [id]);
}

module.exports = {
  getAllUsuario,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};