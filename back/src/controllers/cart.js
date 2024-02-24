import { cartModel } from "../models/Cart.js"
import { comicModel } from "../models/Comic.js"

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
        return cart
    } catch (error) {
        return res.status(400).json({
            status: "Error",
            mensaje: "Error al crear el carrito",
            error: error,
        });
    }
}

const addProdInCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const prodId = req.params.pid
        const cart = await cartModel.findById(cartId)
        const comic = await comicModel.findById(prodId)
        if (!cart) {
            return res.status(400).json({
                status: "Error",
                mensaje: "El carrito no existe",
            });
        }
        if (!comic) {
            return res.status(400).json({
                status: "Error",
                mensaje: "El Comic no existe",
            });
        }

        const alreadyInCart = cart.products.some(product => product._id.toString() === prodId);
        if (alreadyInCart) {
            return res.status(400).json({
                status: "Error",
                mensaje: "El Comic ya está en el carrito",
            });
        }

        cart.products.push(prodId);
        await cart.save()

        return res.status(200).json({
            status: "Success",
            mensaje: "Comic agregado al carrito correctamente",
            cart
        });

    } catch (error) {
        return res.status(400).json({
            status: "Error",
            mensaje: "Error al agregar productos en el carrito",
            error: error,
        });
    }
}

export default {
    getCarts,
    getCartById,
    createCartEmpty,
    addProdInCart
}