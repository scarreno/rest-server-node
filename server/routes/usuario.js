const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');


app.get('/usuarios', function(req, res) {
    res.json('get usuario');
});

app.post('/usuario', function(req, res) {

    let body = req.body;
    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        google: body.google
    });

    usuario.save((err, usuarioDb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        usuarioDb.password = null;

        res.json({
            ok: true,
            usuario: usuarioDb
        });
    });

});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;

    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBd) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBd
        });
    });
});

app.get('/usuario', function(req, res) {
    let pageIndex = req.query.pageIndex || 0;
    pageIndex = Number(pageIndex);

    let pageSize = req.query.pageSize || 5;
    pageSize = Number(pageSize);

    let rowsToSkip = pageIndex * pageSize;

    Usuario.find({})
        .limit(pageSize)
        .skip(rowsToSkip)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.status(200).json({
                ok: true,
                cantidad: usuarios.length,
                usuarios
            });

        })
});
module.exports = app;