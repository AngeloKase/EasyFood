const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

async function processImage(file, folder, prefix) {
    const uploadPath = path.join(
        __dirname,
        "../../../public/images",
        folder
    );

    fs.mkdirSync(uploadPath, { recursive: true });

    const filename = `${prefix}-${Date.now()}.webp`;

    await sharp(file.buffer)
        .resize(800, 800, {
            fit: "inside",
            withoutEnlargement: true
        })
        .webp({ quality: 80 })
        .toFile(path.join(uploadPath, filename));

    return `/images/${folder}/${filename}`;
}

module.exports = {
    processImage
};