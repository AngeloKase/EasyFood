
require("dotenv").config({
    path: require("path").resolve(__dirname, "../.env")
});

const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
