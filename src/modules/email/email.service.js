
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendWelcomeEmail(email, name) {
    return transporter.sendMail({
        from: `"EasyFood" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Bem-vindo à EasyFood!",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 25px;">
                <h1 style="color: #22a06b;">EasyFood 🍽️</h1>

                <h2>Seja bem-vindo à EasyFood!</h2>

                <p>Olá, ${name}!</p>

                <p>
                    Estamos muito felizes em ter você conosco!
                </p>

                <p>
                    Agora você pode explorar restaurantes,
                    descobrir pratos deliciosos e aproveitar
                    tudo que a EasyFood oferece.
                </p>

                <p><strong>Bom apetite!</strong></p>

                <p>Equipe EasyFood</p>
            </div>
        `
    });
}

module.exports = {
    sendWelcomeEmail
};
