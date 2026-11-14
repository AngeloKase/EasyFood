
let restaurantesCarregados = [];
let generoSelecionado = "";

// RESTAURANTES

async function carregarRestaurantes() {
    const lista = document.getElementById("lista-restaurantes");

    try {
        const resposta = await fetch("/restaurants");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os restaurantes.");
        }

        restaurantesCarregados = await resposta.json();

        exibirRestaurantes();

    } catch (error) {
        console.error("Erro ao carregar restaurantes:", error);
        lista.innerHTML = "<p>Erro ao carregar os restaurantes.</p>";
    }
}

function exibirRestaurantes() {
    const lista = document.getElementById("lista-restaurantes");
    const campoBusca = document.getElementById("buscar-restaurante");

    const busca = campoBusca.value.trim().toLocaleLowerCase("pt-BR");

    lista.innerHTML = "";

    const filtrados = restaurantesCarregados.filter((restaurante) => {
        const correspondeGenero =
            !generoSelecionado ||
            restaurante.genre?.name?.toLocaleLowerCase("pt-BR") ===
            generoSelecionado.toLocaleLowerCase("pt-BR");

        const correspondeBusca =
            restaurante.name.toLocaleLowerCase("pt-BR").includes(busca);

        return correspondeGenero && correspondeBusca;
    });

    if (filtrados.length === 0) {
        lista.innerHTML = "<p>Nenhum restaurante encontrado.</p>";
        return;
    }

    filtrados.forEach((restaurante) => {
        const card = document.createElement("article");

        if (restaurante.imageUrl) {
            const imagem = document.createElement("img");
            imagem.src = restaurante.imageUrl;
            imagem.alt = restaurante.name;
            card.appendChild(imagem);
        }

        const nome = document.createElement("h3");
        nome.textContent = restaurante.name;

        const categoria = document.createElement("p");
        categoria.textContent = restaurante.category;

        const avaliacao = document.createElement("p");
        avaliacao.textContent = `⭐ ${restaurante.rating}`;

        card.append(nome, categoria, avaliacao);

        lista.appendChild(card);
    });
}

// FILTROS DE CATEGORIA

document.querySelectorAll(".category").forEach((botao) => {
    botao.addEventListener("click", () => {
        document.querySelectorAll(".category").forEach((item) => {
            item.classList.remove("active");
        });

        botao.classList.add("active");

        let genero = botao.textContent.trim();

        genero = genero.replace(/^[^\p{L}\p{N}]+/u, "").trim();

        generoSelecionado = genero === "Todos" ? "" : genero;

        exibirRestaurantes();
    });
});

// BUSCA DE RESTAURANTES

const campoBusca = document.getElementById("buscar-restaurante");

campoBusca.addEventListener("input", exibirRestaurantes);

// PRATOS

async function carregarPratos() {
    const lista = document.getElementById("lista-pratos");

    try {
        const resposta = await fetch("/dishes");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os pratos.");
        }

        const pratos = await resposta.json();

        lista.innerHTML = "";

        if (pratos.length === 0) {
            lista.innerHTML = "<p>Nenhum prato cadastrado ainda.</p>";
            return;
        }

        pratos.forEach((prato) => {
            const card = document.createElement("article");

            if (prato.imageUrl) {
                const imagem = document.createElement("img");
                imagem.src = prato.imageUrl;
                imagem.alt = prato.name;
                card.appendChild(imagem);
            }

            const nome = document.createElement("h3");
            nome.textContent = prato.name;

            const descricao = document.createElement("p");
            descricao.textContent = prato.description || "Sem descrição.";

            const preco = document.createElement("p");
            preco.textContent = Number(prato.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

            const restaurante = document.createElement("p");
            restaurante.textContent =
                `Restaurante: ${prato.restaurant?.name || "Não informado"}`;

            card.append(nome, descricao, preco, restaurante);

            lista.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao carregar pratos:", error);
        lista.innerHTML = "<p>Erro ao carregar os pratos.</p>";
    }
}

// LOGIN

const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        try {
            const resposta = await fetch("/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.error || "Erro ao fazer login");
                return;
            }

            localStorage.setItem("token", dados.token);

            alert("Login realizado com sucesso!");

        } catch (error) {
            console.error("Erro no login:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
}

// CADASTRO

const registerForm = document.getElementById("register-form");

if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value;

        try {
            const resposta = await fetch("/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.error || "Erro ao realizar cadastro.");
                return;
            }

            alert("Cadastro realizado com sucesso! Verifique seu e-mail.");

            registerForm.reset();

        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
}




// INICIALIZAÇÃO

carregarRestaurantes();
carregarPratos();
