
const express = require("express");

const controller = require("./dish.controller");
const authenticate = require("../auth/auth.middleware");
const upload = require("../shared/upload.middleware");

const router = express.Router();

router.get("/", controller.list);

router.post(
    "/",
    authenticate,
    controller.create
);

router.put(
    "/:id",
    authenticate,
    controller.update
);

router.delete(
    "/:id",
    authenticate,
    controller.remove
);

router.post(
    "/:id/image",
    authenticate,
    upload.single("image"),
    controller.updateImage
);

module.exports = router;
