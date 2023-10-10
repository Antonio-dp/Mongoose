const Producto= require('../models/Producto')

class ProductoDAO{
    static async crearProducto(productoData){
        try {
            const producto=new Producto(productoData)
            return await producto.save()
        } catch (error) {
            throw error
        }
    }

    static async obtenerProductoPorId(id){
        try {
            return await Producto.findById(id)
        } catch (error) {
            throw error
        }
    }

    static async actualizarProducto(id,productoData){
        try {
            return Producto.findByIdAndUpdate(id,productoData,{new:true})
        } catch (error) {
            throw error
        }
    }

    static async eliminarProducto(id){
        try {
            return Producto.findByIdAndRemove(id)
        } catch (error) {
            throw error
        }
    }

    static async obtenerProductos(limit=10){
        try {
            return await Producto.find().limit(limit)
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductoDAO;