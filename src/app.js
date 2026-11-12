const express = require("express");
const cors = require("cors");
const path = require("path");

const restaurantRoutes = require("./modules/restaurants/restaurant.routes");
const authRoutes = require("./modules/auth/auth.routes");
const dishRoutes = require("./modules/dishes/dish.routes");

const { handleUploadError } = require("./modules/shared/upload.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  express.static(path.join(__dirname, "../public"))
);

app.use(
  express.static(path.join(__dirname, "../frontend"))
);

// Arquivos de imagens enviados
app.use(
  "/uploads",
  express.static(path.resolve(process.cwd(), "uploads"))
);

// Rotas
app.use("/restaurants", restaurantRoutes);
app.use("/auth", authRoutes);
app.use(dishRoutes);

// Tratamento de erros de upload
app.use(handleUploadError);

// Tratamento de erros gerais
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.statusCode || 500).json({
    error: error.statusCode
      ? error.message
      : "Erro interno do servidor"
  });
});

module.exports = app;
