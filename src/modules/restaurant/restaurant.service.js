const prisma = require("../../database/prisma");

async function listRestaurants() {

  return prisma.restaurant.findMany({
    include: {
      genre: true
    }
  });

}

async function createRestaurant(data) {

    return prisma.restaurant.create({

        data: {

            name: data.name,

            category: data.category,

            rating: data.rating || 0,

            imageUrl: data.imageUrl,

            genreId: data.genreId

        }

    });

}

async function updateRestaurant(id, data) {

    return prisma.restaurant.update({

        where: {
            id: Number(id)
        },

        data: {

            name: data.name,

            category: data.category,

            rating: data.rating || 0,

            imageUrl: data.imageUrl,

            genreId: data.genreId
                ? Number(data.genreId)
                : null

        }

    });

}

async function deleteRestaurant(id) {

    return prisma.restaurant.delete({
        where: {
            id: Number(id)
        }
    });

}

module.exports = {
  listRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
};