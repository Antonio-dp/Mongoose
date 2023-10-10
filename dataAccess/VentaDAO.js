const Venta = require('../models/Venta');

class VentaDAO{
    static async crearVenta(ventaData){
        try {
            const venta = new Venta(ventaData);
            return await venta.save();
        } catch (error){
            throw error;
        }
    }

    static async obtenerVentaPorId(id){
        try {
            return await Venta.findById(id);
        } catch (error){
            throw error;
        }
    }

    static async actualizarVenta(id, ventaData){
        try {
            return await Venta.findByIdAndUpdate(id, ventaData, {new: true})
        } catch (error){
            throw error;
        }
    }

    static async eliminarVenta(id){
        try {
            return Venta.findByIdAndRemove(id);
        } catch (error){
            throw error;
        }
    }

    static async obtenerVentas(limit = 10){
        try {
            return await Venta.find().limit(limit);
        } catch (error){
            throw error;
        }

    }

    static async agregarProductosAVenta(idVenta, productos){
        try {
            const venta = await Venta.findById(idVenta);
            if (!venta){
                throw new Error('Venta no encontrada');
            }
            venta.productoVenta.push(...productos);
            return await venta.save();
        } catch (error){
            throw error;
        }
    }

    static async obtenerDesgloseVenta(idventa){
        try {
            const venta = await Venta.findById(idventa);

            if (!venta){
                throw new Error('Venta no encontrada')
            }

            const productosVenta = await ProductoVenta.find({idventa: venta._id});

            const desgloseVenta = await Promise.all(productosVenta.map(async(producto) => {

                const producto = await Producto.findById(productoVenta.idProducto);

                //creamos un objeto con los detalles del productoventa
                return {
                    producto: producto,
                    cantidadVendida: productoVenta.cantidadVendida,
                    subtotal: productoVenta.subtotal,
                    precioVenta: productoVenta.precioVenta,
                }

            }));

            return {
                venta:venta,
                desglose: desgloseVenta
            }

        } catch (error){
            throw error;
        }
    }

    static async obtenerTodasLasVentasConDesglose(){
        try {
            const ventas = await Venta.find();

            const ventasConDesglose = await Promise.all(ventas.map(async (venta) => {
                
                const productosVenta = await ProductoVenta.find({idVenta: venta._id });

                const desgloseVenta = await Promise.all(productosVenta.map(async (productoVenta) => {
                    const producto = await Producto.findById(productoVenta.idProducto);
                    return {
                        producto: producto.toJSON(),
                        cantidadVendida: productoVenta.cantidadVendida,
                        subtotal: productoVenta.subtotal,
                        precioVenta: productoVenta.precioVenta,
                    };
                }));

                const productosVentaJSON = productoVenta.map(productoVenta => productoVenta.toJSON());

                return {
                    venta: venta.toJSON(),
                    productoVenta: productosVentaJSON,
                    desglose: desgloseVenta,
                };
            }));

            return ventasConDesglose;
        } catch (error){
            throw error;
        }
    }
}

module.exports = VentaDAO;