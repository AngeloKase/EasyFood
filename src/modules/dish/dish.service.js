
const prisma = require("../../database/prisma");

async function listDishes() {
    return prisma.dish.findMany({
        include: {
            restaurant: true
        }
    });
}

async function createDish(data) {
    return prisma.dish.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            imageUrl: data.imageUrl,
            restaurantId: Number(data.restaurantId)
        }
    });
}

async function updateDishImage(id, imageUrl) {
    return prisma.dish.update({
        where: {
            id: Number(id)
        },
        data: {
            imageUrl
        }
    });
}

async function updateDish(id, data) {
    return prisma.dish.update({
        where: {
            id: Number(id)
        },
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            restaurantId: Number(data.restaurantId)
        }
    });
}

async function deleteDish(id) {
    return prisma.dish.delete({
        where: {
            id: Number(id)
        }
    });
}

module.exports = {
    listDishes,
    createDish,
    updateDishImage,
    updateDish,
    deleteDish
};
