import nodemailer from "nodemailer"
import config from "../config/config.js"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fertorron21@gmail.com',
        pass: config.gmailNodemailer
    }
})

export const sendCreateAccount = async (email) => {
    await transporter.sendMail({
        from: "fertorron21@gmail.com",
        to: email,
        subject: "ComicNest - Cuenta Creada",
        html: `
            <div>
                <h2>Has creado una cuenta en ComicNest</h2>
                <p>¡Bienvenido! Sumérgete en un mundo de aventuras, héroes y villanos. Disfruta de acceso exclusivo a las últimas novedades y descuentos especiales. ¡Que empiece la diversión!</p>
            </div>
        `
    })
}

export const sendBuyStripe = async (email, products) => {
    try {
        let productList = '';
        products.forEach((product, index) => {
            productList += `<li>${index + 1}. ${product.title} - $${product.price}</li>`;
        });

        await transporter.sendMail({
            from: "fertorron21@gmail.com",
            to: email,
            subject: "ComicNest - Compra de Comics",
            html: `
                <div>
                    <h2>Gracias por comprar en ComicNest</h2>
                    <p>Has adquirido los siguientes productos:</p>
                    <ul>
                        ${productList}
                    </ul>
                </div>
            `
        });
    } catch (error) {
        throw new Error("Error al enviar el correo electrónico de compra: " + error);
    }
};