const mongoose = require('mongoose')

const ventaSchema=new mongoose.Schema({
    total:{
        type: Number,
        required:true
    },
    iva:{
        type: Number,
        required:true
    },
    productoVenta:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'ProductoVenta'
    }]
})

module.exports= mongoose.model('Venta',ventaSchema)