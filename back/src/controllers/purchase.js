import { purchaseModel } from "../models/Purchase.js";

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

export default {
    getPurchases
}