const express = require("express");
const cors = require("cors");
const path = require("path");

const restaurantRoutes =
  require("./modules/restaurant/restaurant.routes");

const authRoutes =
  require("./modules/auth/auth.routes");

const dishRoutes =
    require("./modules/dish/dish.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  express.static(
    path.join(__dirname, "../public")
  )
);

app.use("/auth", authRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/dishes", dishRoutes);


app.use((err, req, res, next) => {
    if (err.code === "INVALID_FILE_TYPE") {
        return res.status(400).json({
            error: "Formato de imagem não permitido. Use JPEG, PNG ou WebP."
        });
    }

    if (err instanceof require("multer").MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                error: "A imagem deve ter no máximo 5 MB."
            });
        }

        return res.status(400).json({
            error: "Erro no envio da imagem."
        });
    }

    console.error(err);

    res.status(500).json({
        error: "Erro interno do servidor."
    });
});

module.exports = app;
