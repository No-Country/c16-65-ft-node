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
        subject: "Comics Store - Cuenta Creada",
        html: `
            <div>
                <h2>Has creado una cuenta en Comics Store</h2>
                <p>¡Bienvenido! Sumérgete en un mundo de aventuras, héroes y villanos. Disfruta de acceso exclusivo a las últimas novedades y descuentos especiales. ¡Que empiece la diversión!</p>
            </div>
        `
    })
}