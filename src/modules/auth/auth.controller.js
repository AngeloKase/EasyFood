
const authService = require("./auth.service");
const emailService = require("../email/email.service");
const imageService = require("../shared/image.service");

async function register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Nome, e-mail e senha são obrigatórios"
        });
    }

    try {
        const user = await authService.register({
            name,
            email,
            password
        });

        try {
            await emailService.sendWelcomeEmail(user.email, user.name);
            console.log("E-mail de boas-vindas enviado!");
        } catch (emailError) {
            console.error("Erro ao enviar e-mail:", emailError);
        }

        return res.status(201).json(user);

    } catch (error) {
        console.error(error);

        if (error.code === "P2002") {
            return res.status(409).json({
                error: "E-mail já cadastrado"
            });
        }

        return res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
}

async function login(req, res) {
    try {
        const result = await authService.login(req.body);
        return res.json(result);
    } catch (error) {
        return res.status(401).json({
            error: "E-mail ou senha inválidos"
        });
    }
}

async function updateProfileImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "Envie uma imagem"
            });
        }

        const imageUrl = await imageService.saveImage(
            req.file.buffer,
            "users"
        );

        const user = await authService.updateProfileImage(
            req.user.id,
            imageUrl
        );

        return res.json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro ao atualizar imagem de perfil"
        });
    }
}

async function deleteAccount(req, res) {
    try {
        await authService.deleteAccount(req.user.id);

        return res.json({
            message: "Conta excluída com sucesso."
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Erro ao excluir conta."
        });
    }
}

module.exports = {
    register,
    login,
    updateProfileImage,
    deleteAccount
};
