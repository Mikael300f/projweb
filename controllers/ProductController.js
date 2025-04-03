const Produto = require('../models/produto');

exports.getAll = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
};

exports.create = async (req, res) => {
    try {
        const produto = await Produto.create(req.body);
        res.status(201).json(produto);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
};
