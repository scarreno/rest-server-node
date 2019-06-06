const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();
const _ = require('lodash');

module.exports = app;


app.post('/login', (req, res) => {

    let body = req.body;

    if(_.isEmpty(body) ||  _.isUndefined(body.email) || _.isUndefined(body.password)){
        return res.status(400).json({
            ok: false,
            error: {
                message: "(Usuario) o contraseña inválidos"
            }
        });
    }

    Usuario.findOne({ email: body.email }, (err, usuarioDb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "(Usuario) o contraseña inválidos"
                }
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioDb.password)) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Usuario o (contraseña) inválidos"
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDb
        }, process.env.TOKEN_SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        return res.status(200).json({
            ok: true,
            usuario: usuarioDb,
            token
        });

    });

});