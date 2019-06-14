const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();
const _ = require('lodash');

module.exports = app;


app.post('/login2', (req, res) => {

    let body = req.body;
    console.log('ingresa al login2');


    console.log('valida body');
    if(_.isEmpty(body) ||  _.isUndefined(body.email) || _.isUndefined(body.password)){
        return res.status(400).json({
            ok: false,
            error: {
                message: "(Usuario) o contraseña inválidos"
            }
        });
    }

    console.log('obtiene usuario bd');
    Usuario.findOne({ email: body.email }, (err, usuarioDb) => {
        if (err) {
            console.log('obtiene usuario bd:::ERROR');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDb) {
            console.log('obtiene usuario bd:::NO EXISTE');
            return res.status(400).json({
                ok: false,
                error: {
                    message: "(Usuario) o contraseña inválidos"
                }
            });
        }
        console.log('obtiene usuario bd:::EXITOSO');
        let token = jwt.sign({
            usuario: usuarioDb
        }, process.env.TOKEN_SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        console.log('RETORNA 200');
        return res.status(200).json({
            ok: true,
            usuario: usuarioDb,
            token
        });

    });

    console.log('LLEGA AL FINAL');

/*
    return res.status(200).json({
        ok: false,
        error: {
            message: "Llega al login",
            email: body.email,
            password: body.password
        }
    });
*/

    return res.status(400).json({
        ok: false,
        error: {
            message: "No se logró conectar con la BD"
        }
    });
});

app.post('/login', (req, res) => {

    console.log('LOGIN');
    let body = req.body;

    if(_.isEmpty(body) ||  _.isUndefined(body.email) || _.isUndefined(body.password)){
        return res.status(400).json({
            ok: false,
            error: {
                message: "(Usuario) o contraseña inválidos"
            }
        });
    }

    try
    {
        console.log('FIND ONE');
        Usuario.findOne({ email: body.email }, (err, usuarioDb) => {
            console.log('FIND ONE: OKKKKK');
            console.log(usuarioDb);
            console.log(err);
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
            
           console.log('JWT');
           console.log(process.env.TOKEN_SEED);

            let token = jwt.sign({
                usuario: usuarioDb
            }, process.env.TOKEN_SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

            console.log('RESPONSE');
            console.log(token);
            return res.status(200).json({
                ok: true,
                usuario: usuarioDb,
                token
            });

        });
    }
    catch(err)
    {
        return res.status(400).json({
            ok: false,
            error: {
                message: "No se logró conectar con la BD"
            }
        });
    }
});