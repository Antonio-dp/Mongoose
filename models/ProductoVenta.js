const mongoose = require('mongoose')

const ProductoVentaScema= new mongoose.Schema({
    idventa:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Venta',
        require:true
    },
    idproducto:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Producto',
        require:true
    },
    cantidadVenta:{
        type: Number,
        required: true
    },
    subtotal:{
        type: Number,
        required: true
    },
    precioVenta:{
        type: Number,
        required: true
    },
})

module.exports= mongoose.model('ProductoVenta',ProductoVentaScema)