const User = require('../models/User');

module.exports = {
    async listar(req, res) {
        const usuarios = await User.findAll();
        res.json(usuarios);
    },

    async buscar(req, res) {
        const usuario = await User.findByPk(req.params.id);
        usuario ? res.json(usuario) : res.status(404).json({ erro: "Usuário não encontrado" });
    },

    async criar(req, res) {
        try {
            const usuario = await User.create(req.body);
            res.status(201).json(usuario);
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    },

    async atualizar(req, res) {
        try {
            await User.update(req.body, { where: { id: req.params.id } });
            res.json({ mensagem: "Usuário atualizado com sucesso" });
        } catch (erro) {
            res.status(400).json({ erro: erro.message });
        }
    },

    async deletar(req, res) {
        await User.destroy({ where: { id: req.params.id } });
        res.json({ mensagem: "Usuário excluído" });
    }
};