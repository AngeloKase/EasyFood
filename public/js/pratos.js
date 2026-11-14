
const form = document.getElementById("dish-form");

// CARREGAR RESTAURANTES
async function carregarRestaurantes() {

    const select = document.getElementById("restaurantId");

    try {

        const resposta = await fetch("/restaurants");

        if (!resposta.ok) {
            throw new Error("Erro ao carregar restaurantes.");
        }

        const restaurantes = await resposta.json();

        restaurantes.forEach((restaurante) => {

            const option = document.createElement("option");

            option.value = restaurante.id;
            option.textContent = restaurante.name;

            select.appendChild(option);

        });

    } catch (error) {

        console.error(error);

        alert("Não foi possível carregar os restaurantes.");

    }

}

// CADASTRAR PRATO
form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const description =
        document.getElementById("description").value.trim();

    const price =
        document.getElementById("price").value;

    const restaurantId =
        document.getElementById("restaurantId").value;

    const image =
        document.getElementById("image").files[0];

    const token =
        localStorage.getItem("token");

    if (!token) {
        alert("Você precisa estar logado para cadastrar um prato.");
        return;
    }

    try {

        // CADASTRAR OS DADOS DO PRATO
        const resposta = await fetch("/dishes", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                name,
                description,
                price: Number(price),
                restaurantId: Number(restaurantId)
            })

        });

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(
                dados.error ||
                "Erro ao cadastrar prato."
            );

            return;
        }

        // ENVIAR A IMAGEM DO PRATO
        const formData = new FormData();

        formData.append("image", image);

        const respostaImagem = await fetch(
            `/dishes/${dados.id}/image`,
            {

                method: "POST",

                headers: {
                    "Authorization": `Bearer ${token}`
                },

                body: formData

            }
        );

        const dadosImagem = await respostaImagem.json();

        if (!respostaImagem.ok) {

            alert(
                "O prato foi cadastrado, mas houve um erro ao enviar a imagem: " +
                (dadosImagem.error || "Erro desconhecido.")
            );

            form.reset();

            return;
        }

        alert("Prato cadastrado com sucesso!");

        form.reset();

    } catch (error) {

        console.error("Erro ao cadastrar prato:", error);

        alert("Erro ao conectar com o servidor.");

    }

});

// INICIALIZAÇÃO
carregarRestaurantes();
