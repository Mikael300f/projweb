const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Product = sequelize.define('Product', {
    nome: { type: DataTypes.STRING, allowNull: false, validate: { len: [3, 100] } },
    preco: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 0 } },
    estoque: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } }
});

module.exports = Product;