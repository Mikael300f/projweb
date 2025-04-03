const Produto = require('../models/produto'); // Certifique-se de que o caminho está correto

exports.getAll = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos', details: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        console.log("📥 Recebendo dados:", req.body);

        const { nome, preco, estoque } = req.body;

        if (!nome || nome.length < 3) {
            return res.status(400).json({ error: "O nome do produto deve ter pelo menos 3 caracteres." });
        }

        if (!preco || preco <= 0) {
            return res.status(400).json({ error: "O preço deve ser um valor positivo." });
        }

        if (estoque === undefined || !Number.isInteger(estoque) || estoque < 0) {
            return res.status(400).json({ error: "O estoque deve ser um número inteiro maior ou igual a zero." });
        }

        // Criando o produto no banco de dados
        const produto = await Produto.create({ nome, preco, estoque });

        console.log("✅ Produto criado:", produto);
        return res.status(201).json(produto);
    } catch (error) {
        console.error("❌ Erro ao criar produto:", error);
        res.status(500).json({ error: "Erro ao criar produto", details: error.message });
    }
};
