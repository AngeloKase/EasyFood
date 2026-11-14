const restaurantService = require("./restaurant.service");
const dishService = require("../dish/dish.service");
const imageService = require("../shared/image.service");

async function list(req, res) {
    try {
        const restaurants = await restaurantService.listRestaurants();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}

async function create(req, res) {
    const { name, category, rating, genreId } = req.body;

    if (!name || !category) {
        return res.status(400).json({
            error: "Nome e categoria são obrigatórios"
        });
    }

    try {
        const imageUrl = req.file
            ? await imageService.processImage(
                req.file,
                "restaurants",
                "restaurant"
            )
            : null;

        const restaurant = await restaurantService.createRestaurant({
            name,
            category,
            rating,
            imageUrl,
            genreId: genreId ? Number(genreId) : null
        });

        res.status(201).json(restaurant);

    } catch (error) {
        console.error("ERRO AO CRIAR RESTAURANTE:", error);
        res.status(500).json({ error: error.message });
    }
}

// Cadastrar prato dentro de um restaurante
async function createDish(req, res) {
    const { name, description, price } = req.body;
    const restaurantId = Number(req.params.restaurantId);
   

    if (!name || price === undefined || price === null || price === "") {
        return res.status(400).json({
            error: "Nome e preço são obrigatórios"
        });
    }

    if (!Number.isFinite(restaurantId) || restaurantId <= 0) {
        return res.status(400).json({
            error: "ID do restaurante inválido"
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
        console.error("ERRO AO CADASTRAR PRATO:", error);

        if (error.code === "P2003") {
            return res.status(404).json({
                error: "Restaurante não encontrado"
            });
        }

        res.status(500).json({
            error: "Erro ao cadastrar prato"
        });
    }
}

async function update(req, res) {
    const { id } = req.params;
    const { name, category, rating, genreId } = req.body || {};

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!name || !category) {
        return res.status(400).json({
            error: "Nome e categoria são obrigatórios"
        });
    }

    try {
        const imageUrl = req.file
            ? await imageService.processImage(
                req.file,
                "restaurants",
                "restaurant"
            )
            : undefined;

        const restaurant = await restaurantService.updateRestaurant(id, {
            name,
            category,
            rating,
            genreId,
            imageUrl
        });

        res.json(restaurant);

    } catch (error) {
        console.error("ERRO AO EDITAR RESTAURANTE:", error);
        res.status(500).json({ error: error.message });
    }
}

async function remove(req, res) {
    const { id } = req.params;

    try {
        await restaurantService.deleteRestaurant(id);
        res.json({ message: "Restaurante removido com sucesso!" });

    } catch (error) {
        console.error("ERRO AO REMOVER RESTAURANTE:", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    list,
    create,
    createDish,
    update,
    remove
};
