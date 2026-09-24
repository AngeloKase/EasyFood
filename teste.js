const prisma = require("./src/database/prisma");

async function main() {

    const mexicana = await prisma.genre.upsert({
        where: {
            name: "Mexicana"
        },
        update: {},
        create: {
            name: "Mexicana"
        }
    });

    const pizza = await prisma.genre.findUnique({
        where: { name: "Pizza" }
    });

    const hamburguer = await prisma.genre.findUnique({
        where: { name: "Hambúrguer" }
    });

    const japones = await prisma.genre.findUnique({
        where: { name: "Japonês" }
    });

    const brasileira = await prisma.genre.findUnique({
        where: { name: "Brasileira" }
    });

    await prisma.restaurant.update({
        where: { id: 1 },
        data: {
            name: "Pizzaria Imperio",
            category: "Pizza",
            genreId: pizza.id,
            imageUrl: "/images/restaurants/pizzaria-imperio.jpg"
        }
    });

    await prisma.restaurant.update({
        where: { id: 2 },
        data: {
            name: "Gordos - Burger em outro nivel",
            category: "Hambúrguer",
            genreId: hamburguer.id,
            imageUrl: "/images/restaurants/gordos-burger.jpg"
        }
    });

    await prisma.restaurant.update({
        where: { id: 3 },
        data: {
            name: "NOKA Sushi",
            category: "Japonês",
            genreId: japones.id,
            imageUrl: "/images/restaurants/noka-sushi.jpg"
        }
    });

    await prisma.restaurant.update({
        where: { id: 4 },
        data: {
            name: "Taco Shop - Pinheiros",
            category: "Mexicana",
            genreId: mexicana.id,
            imageUrl: "/images/restaurants/taco-shop.jpg"
        }
    });

    await prisma.restaurant.update({
        where: { id: 5 },
        data: {
            name: "Habib’s Morumbi",
            category: "Brasileira",
            genreId: brasileira.id,
            imageUrl: "/images/restaurants/habibs-morumbi.jpg"
        }
    });

    console.log("Restaurantes atualizados!");
}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });