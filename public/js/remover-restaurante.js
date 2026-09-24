const token = localStorage.getItem("token");

if (!token) {
    alert("Você precisa estar logado para remover um restaurante.");
    window.location.href = "/";
    throw new Error("Usuário não autenticado");
}

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


carregarRestaurantes();


form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const id =
        restaurantSelect.value;

    if (!id) {

        alert("Selecione um restaurante.");

        return;
    }

    const nome =
        restaurantSelect.options[
            restaurantSelect.selectedIndex
        ].textContent;

    const confirmar =
        confirm(
            `Tem certeza que deseja remover "${nome}"?`
        );

    if (!confirmar) {
        return;
    }

    try {

        const resposta =
            await fetch(`/restaurants/${id}`, {

                method: "DELETE",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }

            });

        const dados =
            await resposta.json();

        if (!resposta.ok) {

            alert(
                dados.error ||
                "Erro ao remover restaurante."
            );

            return;
        }

        alert(
            "Restaurante removido com sucesso!"
        );

        restaurantSelect.remove(
            restaurantSelect.selectedIndex
        );

        restaurantSelect.value = "";

    } catch (error) {

        console.error(
            "Erro ao remover:",
            error
        );

        alert(
            "Erro ao conectar com o servidor."
        );

    }

});