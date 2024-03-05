import { purchaseModel } from "../models/Purchase.js";
import { cartModel } from "../models/Cart.js"
import { userModel } from "../models/User.js"
import { sendBuyStripe } from "../utils/email.js";

const getPurchases = async (req, res) => {
    try {
        const purchases = await purchaseModel.find()
        return res.status(200).json({
            status: "Success",
            purchases,
        });
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            mensaje: "Error al obtener las compras",
            error: error,
        });
    }
};

const getPurchaseByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "Usuario no encontrado",
            });
        }

        const purchase = await purchaseModel.find({ purchaser: user.email }).populate("products._id");

        if (!purchase) {
            return res.status(404).json({
                status: "Error",
                message: "Compras no encontradas para este usuario",
            });
        }

        return res.status(200).json({
            status: "Success",
            purchase,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Error al obtener la compra",
            error: error.message,
        });
    }
};


const createPurchase = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });
        const cart = await cartModel.findById(user.cart).populate("products._id")

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "Usuario no encontrado",
            });
        }

        if (!cart) {
            return res.status(404).json({
                status: "Error",
                message: "Carrito no encontrado para este usuario",
            });
        }

        if (cart.products.length === 0) {
            return res.status(400).json({
                status: "Error",
                message: "El carrito del usuario está vacío",
            });
        }

        const purchase = new purchaseModel({
            purchase_datetime: new Date(),
            purchaser: user.email,
            products: cart.products.map(product => ({ _id: product._id }))
        });

        const products = cart.products.map(product => product._id);
        await sendBuyStripe(user.email, products);
        await purchase.save();
        cart.products = [];
        await cart.save();

        return res.status(200).json({
            status: "Success",
            message: "Compra realizada con éxito",
            purchase,
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Error al crear la compra",
            error: error.message,
        });
    }
};

export default {
    getPurchases,
    getPurchaseByEmail,
    createPurchase
}