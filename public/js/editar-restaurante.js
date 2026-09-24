const form = document.getElementById("restaurant-form");

const restaurantSelect =
    document.getElementById("restaurantId");

async function carregarRestaurantes() {

    try {

        const resposta =
            await fetch("/restaurants");

        const restaurantes =
            await resposta.json();

        restaurantes.forEach((restaurante) => {

            const option =
                document.createElement("option");

            option.value = restaurante.id;

            option.textContent =
                restaurante.name;

            restaurantSelect.appendChild(option);

        });

    } catch (error) {

        console.error(
            "Erro ao carregar restaurantes:",
            error
        );

    }

}

restaurantSelect.addEventListener(
    "change",
    async () => {

        const id =
            restaurantSelect.value;

        if (!id) {
            return;
        }

        try {

            const resposta =
                await fetch("/restaurants");

            const restaurantes =
                await resposta.json();

            const restaurante =
                restaurantes.find(
                    (item) =>
                        item.id === Number(id)
                );

            if (!restaurante) {
                return;
            }

            document.getElementById("name").value =
                restaurante.name || "";

            document.getElementById("category").value =
                restaurante.category || "";

            document.getElementById("genreId").value =
                restaurante.genreId || "";

            document.getElementById("rating").value =
                restaurante.rating || "";

        } catch (error) {

            console.error(
                "Erro ao carregar restaurante:",
                error
            );

        }

    }
);

carregarRestaurantes();


form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const token = localStorage.getItem("token");

        if (!token) {
            alert("Você precisa estar logado para acessar esta página.");
            window.location.href = "/";
    }

    const id =
        restaurantSelect.value;

    if (!id) {

        alert(
            "Selecione um restaurante."
        );

        return;
    }

    const name =
        document.getElementById("name").value;

    const category =
        document.getElementById("category").value;

    const genreId =
        document.getElementById("genreId").value;

    const rating =
        document.getElementById("rating").value;

    const image =
        document.getElementById("image").files[0];

    const formData =
        new FormData();

    formData.append(
        "name",
        name
    );

    formData.append(
        "category",
        category
    );

    formData.append(
        "genreId",
        genreId
    );

    formData.append(
        "rating",
        rating
    );

    if (image) {

        formData.append(
            "image",
            image
        );

    }

    try {

        const resposta =
            await fetch(
                `/restaurants/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    },

                    body: formData
                }
            );

        const dados =
            await resposta.json();

        if (resposta.status === 401) {

            alert(
                "Você precisa estar logado para editar um restaurante."
            );

            return;
        }

        if (!resposta.ok) {

            alert(
                dados.error ||
                "Erro ao editar restaurante"
            );

            return;
        }

        alert(
            "Restaurante atualizado com sucesso!"
        );

        form.reset();

        restaurantSelect.value = "";

    } catch (error) {

        console.error(
            "Erro ao editar:",
            error
        );

        alert(
            "Erro ao conectar com o servidor."
        );

    }

});