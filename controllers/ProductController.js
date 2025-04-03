const Product = require('../models/Product');

module.exports = {
    async listar(req, res) {
        const produtos = await Product.findAll();
        res.json(produtos);
    },

    async buscar(req, res) {
        const produto = await Product.findByPk(req.params.id);
        produto ? res.json(produto) : res.status(404).json({ erro: "Produto não encontrado" });
    },

    async criar(req, res) {
        try {
            const produto = await Product.create(req.body);
            res.status(201).json(produto);
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    },

    async atualizar(req, res) {
        try {
            await Product.update(req.body, { where: { id: req.params.id } });
            res.json({ mensagem: "Produto atualizado com sucesso" });
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    },

    async deletar(req, res) {
        await Product.destroy({ where: { id: req.params.id } });
        res.json({ mensagem: "Produto excluído" });
    }
};
