const restaurantService = require("./restaurant.service");

async function list(req, res) {
  try {
    const restaurants = await restaurantService.listRestaurants();

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
}

async function create(req, res) {

    const {
        name,
        category,
        rating,
        genreId
    } = req.body;

    if (!name || !category) {

        return res.status(400).json({
            error: "Nome e categoria são obrigatórios"
        });

    }

    try {

        const imageUrl = req.file
            ? `/images/restaurants/${req.file.filename}`
            : null;

        const restaurant =
            await restaurantService.createRestaurant({

                name,
                category,
                rating,

                imageUrl,

                genreId: genreId
                    ? Number(genreId)
                    : null

            });

        res.status(201).json(restaurant);

    } catch (error) {

        console.error(
            "ERRO AO CRIAR RESTAURANTE:",
            error
        );

        res.status(500).json({
            error: error.message
        });

    }
}

async function update(req, res) {

    const { id } = req.params;

    const {
        name,
        category,
        rating,
        genreId
    } = req.body || {};

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!name || !category) {

        return res.status(400).json({
            error: "Nome e categoria são obrigatórios"
        });

    }

    

    try {

        const imageUrl = req.file
            ? `/images/restaurants/${req.file.filename}`
            : undefined;

        const restaurant =
            await restaurantService.updateRestaurant(
                id,
                {
                    name,
                    category,
                    rating,
                    genreId,
                    imageUrl
                }
            );

        res.json(restaurant);

    } catch (error) {

        console.error(
            "ERRO AO EDITAR RESTAURANTE:",
            error
        );

        res.status(500).json({
            error: error.message
        });

    }

}


async function remove(req, res) {

    const { id } = req.params;

    try {

        await restaurantService.deleteRestaurant(id);

        res.json({
            message: "Restaurante removido com sucesso!"
        });

    } catch (error) {

        console.error(
            "ERRO AO REMOVER RESTAURANTE:",
            error
        );

        res.status(500).json({
            error: error.message
        });

    }
}

module.exports = {
  list,
  create,
  update,
  remove
};