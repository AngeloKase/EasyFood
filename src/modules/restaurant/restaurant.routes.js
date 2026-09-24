const express = require("express");
const multer = require("multer");
const path = require("path");

const controller =
    require("./restaurant.controller");

const authenticate =
    require("../auth/auth.middleware");

const router = express.Router();

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(
            null,
            path.join(
                __dirname,
                "../../../public/images/restaurants"
            )
        );

    },

    filename: function (req, file, cb) {

        const nome =
            Date.now() +
            "-" +
            file.originalname;

        cb(null, nome);

    }

});

const upload = multer({
    storage: storage
});

router.get(
    "/",
    controller.list
);

router.post(
    "/",
    authenticate,
    upload.single("image"),
    controller.create
);

router.put(
    "/:id",
    authenticate,
    upload.single("image"),
    controller.update
);
router.delete(
    "/:id",
    authenticate,
    controller.remove
);

module.exports = router;