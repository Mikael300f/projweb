const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

async function getAllUsuario() {
  try {
    return await Usuario.findAll();
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    throw new Error('Erro ao buscar usuários');
  }
}

async function getUsuarioById(id) {
  try {
    const usuario = await Usuario.findByPk(id);
    return usuario || null;
  } catch (err) {
    console.error(`Erro ao buscar usuário com ID ${id}:`, err);
    throw new Error('Erro ao buscar usuário');
  }
}

async function createUsuario({ nome, email, senha }) {
  try {
    console.log('👤 Criando usuário:', { nome, email });
    const usuario = await Usuario.create({ nome, email, senha });
    return usuario.id;
  } catch (err) {
    console.error('❌ Erro ao criar usuário:', err);
    throw new Error('Erro ao criar usuário');
  }
}

async function updateUsuario(id, { nome, email, senha }) {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuário não encontrado');

    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senha;
    await usuario.save();

    return usuario;
  } catch (err) {
    console.error(`Erro ao atualizar usuário com ID ${id}:`, err);
    throw new Error('Erro ao atualizar usuário');
  }
}

async function deleteUsuario(id) {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuário não encontrado');

    await usuario.destroy();
  } catch (err) {
    console.error(`Erro ao deletar usuário com ID ${id}:`, err);
    throw new Error('Erro ao excluir usuário');
  }
}

module.exports = {
  Usuario,
  getAllUsuario,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};