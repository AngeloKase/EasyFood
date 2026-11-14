
const dishService = require("./dish.service");
const imageService = require("../shared/image.service");

async function list(req, res) {
    try {
        const dishes = await dishService.listDishes();
        res.json(dishes);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Erro ao listar pratos"
        });
    }
}

async function create(req, res) {
    const { name, description, price, restaurantId } = req.body;

    if (!name || !price || !restaurantId) {
        return res.status(400).json({
            error: "Nome, preço e restaurante são obrigatórios"
        });
    }

    try {
        const dish = await dishService.createDish({
            name,
            description,
            price,
            restaurantId
        });

        res.status(201).json(dish);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Erro ao cadastrar prato"
        });
    }
}

async function update(req, res) {
    const { name, description, price, restaurantId } = req.body;

    if (!name || !price || !restaurantId) {
        return res.status(400).json({
            error: "Nome, preço e restaurante são obrigatórios"
        });
    }

    try {
        const dish = await dishService.updateDish(
            req.params.id,
            {
                name,
                description,
                price,
                restaurantId
            }
        );

        res.json(dish);
    } catch (error) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({
                error: "Prato não encontrado"
            });
        }

        res.status(500).json({
            error: "Erro ao atualizar prato"
        });
    }
}

async function remove(req, res) {
    try {
        await dishService.deleteDish(req.params.id);

        res.json({
            message: "Prato removido com sucesso!"
        });
    } catch (error) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({
                error: "Prato não encontrado"
            });
        }

        res.status(500).json({
            error: "Erro ao remover prato"
        });
    }
}

async function updateImage(req, res) {
    if (!req.file) {
        return res.status(400).json({
            error: "Nenhuma imagem foi enviada"
        });
    }

    try {
        const imageUrl = await imageService.processImage(
            req.file,
            "dishes",
            "dish"
        );

        const dish = await dishService.updateDishImage(
            req.params.id,
            imageUrl
        );

        res.json({
            message: "Imagem do prato atualizada com sucesso!",
            dish
        });
    } catch (error) {
        console.error(error);

        if (error.code === "P2025") {
            return res.status(404).json({
                error: "Prato não encontrado"
            });
        }

        res.status(500).json({
            error: "Erro ao atualizar imagem do prato"
        });
    }
}

module.exports = {
    list,
    create,
    update,
    remove,
    updateImage
};
