const ProductoVenta = require('../models/ProductoVenta');

class ProductoVentaDAO{
    static async crearProductoVenta(productoVentaData){
        try {
            const productoVenta = new ProductoVenta(productoVentaData);
            return await productoVenta.save();
        } catch (error){
            throw error;
        }
    }

    static async obtenerProductoVentaPorId(id){
        try {
            return await ProductoVenta.findById(id);
        } catch (error){
            throw error;
        }
    }

    static async actualizarProductoVenta(id, productoVentaData){
        try {
            return await ProductoVenta.findByIdAndUpdate(id, productoVentaData, {new: true})
        } catch (error){
            throw error;
        }
    }

    static async eliminarProductoVenta(id){
        try {
            return ProductoVenta.findByIdAndRemove(id);
        } catch (error){
            throw error;
        }
    }

    static async obtenerProductosVenta(limit = 10){
        try {
            return await ProductoVenta.find().limit(limit);
        } catch (error){
            throw error;
        }
    }
}

module.exports = ProductoVentaDAO;
