const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'El contraseña es necesario']
    },
    img: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        default: 'USER_ROL'
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);