import { cartModel } from "../models/Cart.js"

const getCarts = async (req, res) => {
    try {
        const carts = await cartModel.find()
        return res.status(200).json({
            status: "Success",
            carts,
        });
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            mensaje: "Error al obtener los carritos",
            error: error,
        });
    }
};

const getCartById = async (req, res) => {
    try {
        const idCart = req.params.id
        const cart = await cartModel.findById(idCart)
        return res.status(200).json({
            status: "Success",
            cart,
        });
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            mensaje: "Error al obtener el carrito",
            error: error,
        });
    }
}

const createCartEmpty = async (req, res) => {
    try {
        const products = {
            products: []
        }
        const cart = await cartModel.create(products)
        return res.status(200).json({
            status: "Success",
            cart,
        });
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            mensaje: "Error al crear el carrito",
            error: error,
        });
    }
}

export default {
    getCarts,
    getCartById,
    createCartEmpty
}