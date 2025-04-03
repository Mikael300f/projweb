const Usuario = require('../models/usuario');

exports.getAll = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        console.log("📥 Recebendo dados do usuário:", req.body);

        const { nome, email, senha } = req.body;

        if (!nome || nome.length < 3) {
            return res.status(400).json({ error: "O nome deve ter pelo menos 3 caracteres." });
        }

        if (!email || !email.includes("@")) {
            return res.status(400).json({ error: "Email inválido." });
        }

        if (!senha || senha.length < 6) {
            return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres." });
        }

        const usuario = await Usuario.create({ nome, email, senha });

        console.log("✅ Usuário criado:", usuario);
        return res.status(201).json(usuario);
    } catch (error) {
        console.error("❌ Erro ao criar usuário:", error);
        res.status(500).json({ error: "Erro ao criar usuário", details: error.message });
    }
};
