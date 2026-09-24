async function carregarRestaurantes(genero = "") {
    try {
        const resposta = await fetch("/restaurants");

        const restaurantes = await resposta.json();

        const lista = document.getElementById("lista-restaurantes");

        lista.innerHTML = "";

        restaurantes
            .filter((restaurante) => {
                if (!genero) return true;

                return restaurante.genre?.name === genero;
            })
            .forEach((restaurante) => {

                const card = document.createElement("article");

                card.innerHTML = `
                    <img src="${restaurante.imageUrl}" alt="${restaurante.name}">
                    <h3>${restaurante.name}</h3>
                    <p>${restaurante.category}</p>
                    <p>⭐ ${restaurante.rating}</p>
                `;

                lista.appendChild(card);
            });

    } catch (error) {
        console.error("Erro ao carregar restaurantes:", error);
    }
}

document.querySelectorAll(".category").forEach((botao) => {

    botao.addEventListener("click", () => {

        const genero = botao.textContent.trim()
            .replace("🍔 ", "")
            .replace("🍕 ", "")
            .replace("🍣 ", "")
            .replace("🍲 ", "")
            .replace("🌮 ", "");

        if (genero === "Todos") {
            carregarRestaurantes();
        } else {
            carregarRestaurantes(genero);
        }

    });

});

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
            loginForm.querySelector('input[type="email"]').value;

        const password =
            loginForm.querySelector('input[type="password"]').value;

        try {

            const resposta = await fetch("/auth/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const dados = await resposta.json();

            if (!resposta.ok) {

                alert(dados.error || "Erro ao fazer login");

                return;
            }

            localStorage.setItem(
                "token",
                dados.token
            );

            alert("Login realizado com sucesso!");

        } catch (error) {

            console.error(error);

            alert("Erro ao conectar com o servidor.");

        }

    });

}

carregarRestaurantes();