const mongoose = require('mongoose');

const config={
    url:'mongodb://localhost:27017/mongoose',
    options :{
        usenewUrlParser: true,
        useUnifiedTopology: true
    }
}
function conectar(){
    return mongoose.connect(config.url, config.options)
}
function desconectar(){
    return mongoose.disconnect(config.url, config.options)
}

module.exports = {conectar, desconectar};