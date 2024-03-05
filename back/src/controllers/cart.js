import { cartModel } from "../models/Cart.js"
import { comicModel } from "../models/Comic.js"
import { userModel } from "../models/User.js"

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
        const cart = await cartModel.findById(idCart).populate("products._id")
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

const getCartByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "Usuario no encontrado",
            });
        }

        const cart = await cartModel.findById(user.cart).populate("products._id");

        if (!cart) {
            return res.status(404).json({
                status: "Error",
                message: "Carrito no encontrado para este usuario",
            });
        }

        return res.status(200).json({
            status: "Success",
            cart,
        });
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Error al obtener el carrito",
            error: error.message,
        });
    }
};


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

const deleteProdInCart = async (req, res) => {
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

        const cartNew = await cartModel.findOneAndUpdate(
            { _id: cartId },
            { $pull: { products: { _id: prodId } } },
            { new: true }
        );

        return res.status(200).json({
            status: "Success",
            mensaje: "Comic eliminado del carrito correctamente",
            cartNew
        });

    } catch (error) {
        return res.status(400).json({
            status: "Error",
            mensaje: "Error al eliminar el producto del carrito",
            error: error,
        });
    }
}

const emptyCart = async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findById(cartId)
        if (!cart) {
            return res.status(400).json({
                status: "Error",
                mensaje: "El carrito no existe",
            });
        }

        cart.products = [];
        await cart.save()

        return res.status(200).json({
            status: "Success",
            mensaje: "Comic eliminado del carrito correctamente",
            cart
        });

    } catch (error) {
        return res.status(400).json({
            status: "Error",
            mensaje: "Error al Vaciar el carrito",
            error: error,
        });
    }
}

export default {
    getCarts,
    getCartById,
    createCartEmpty,
    addProdInCart,
    getCartByEmail,
    deleteProdInCart,
    emptyCart
}