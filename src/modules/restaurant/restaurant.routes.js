
const express = require("express");

const controller = require("./restaurant.controller");
const authenticate = require("../auth/auth.middleware");
const upload = require("../shared/upload.middleware");

const router = express.Router();

router.get(
    "/",
    controller.list
);

// Cadastro de restaurante
router.post(
    "/",
    authenticate,
    upload.single("image"),
    controller.create
);

// Cadastro de prato vinculado ao restaurante
router.post(
    "/:restaurantId/dishes",
    authenticate,
    controller.createDish
);

// Edição de restaurante
router.put(
    "/:id",
    authenticate,
    upload.single("image"),
    controller.update
);

// Exclusão de restaurante
router.delete(
    "/:id",
    authenticate,
    controller.remove
);

module.exports = router;
