const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('User', {
    nome: { type: DataTypes.STRING, allowNull: false, validate: { len: [3, 100] } },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } }
});

module.exports = User;
