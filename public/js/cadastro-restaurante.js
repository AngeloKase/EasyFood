const form = document.getElementById("restaurant-form");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

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

    const token =
        localStorage.getItem("token");

    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("genreId", genreId);
    formData.append("rating", rating);
    formData.append("image", image);

    try {

        const resposta = await fetch("/restaurants", {

            method: "POST",

            headers: {
                "Authorization": `Bearer ${token}`
            },

            body: formData

        });

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(
                dados.error ||
                "Erro ao cadastrar restaurante"
            );

            return;
        }

        alert(
            "Restaurante cadastrado com sucesso!"
        );

        form.reset();

    } catch (error) {

        console.error(error);

        alert(
            "Erro ao conectar com o servidor."
        );

    }

});