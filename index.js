const db = require('./config/db');
const ProductoDAO = require('./dataAccess/productoDAO');
const ProductoVentaDAO = require('./dataAccess/ProductoVentaDAO');
const VentaDAO = require('./dataAccess/VentaDAO');


db.conectar()
    .then(async () => {
        try {
            for (let i = 1; i <= 10; i++){
                const nuevoProducto = {
                    nombre: `Producto ${i}`,
                    precio: Math.floor(Math.random() * 100) + 1,
                    cantidaD: Math.floor(Math.random() * 50) + 1,
                };
                await ProductoDAO.crearProducto(nuevoProducto);
                console.log(`Producto ${i} creado.`);
            }

            for (let i = 1; i <= 3; i++){
                const nuevaVenta = {
                    total: Math.floor(Math.random() * 1000) + 1,
                    iva: Math.floor(Math.random() * 100) + 1,
                };
                const ventaCreada = await VentaDAO.crearVenta(nuevaVenta);
                console.log(`Venta ${i} creada.`);

                const productos = await ProductoDAO.obtenerProductos(3);

                const productosVenta = productos.map(productos => ({
                    idVenta: ventaCreada._id,
                    idProducto: producto._id,
                    cantidadVendida: Math.floor(Math.random() * producto.cantidad) + 1,
                    subtotal: producto.precio * (Math.floor(Math.random() * producto.cantidad) + 1),
                    precioVenta: producto.precio,
                }));

                for (const productoVenta of productosVenta){
                    await ProductoVentaDAO.crearProductoVenta(productoVenta);
                }

                await VentaDAO.agregarProductosAVenta(ventaCreada._id, productos.map(producto => producto._id))
                console.log(`Productos asignados a la Venta  ${i}.`);
            }
            const desgloseVenta1 = await VentaDAO.obtenerDesgloseVenta('651a225a9da869effbddea86');
            console.log('Desglose de la Venta:', desgloseVenta1);
            const desgloseVenta = await VentaDAO.obtenerTodasLasVentasConDesglose();
            console.log('Desglose de la Venta:', desgloseVenta);
            db.desconectar();
        } catch (error) {
            console.error('Error en las pruebas:', err);
        }
    }).catch(err => {
        console.error('Error en la conexión a la base de datos:', err);
    })