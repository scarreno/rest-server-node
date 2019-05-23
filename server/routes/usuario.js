const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken, verificaAdminRole } = require('../middlewares/authentication');

app.get('/status', function(req, res) {
    res.json({
        status: "Servicios Disponibles!"
    });
});

app.get('/env', function(req, res) {
    res.json({
        env: process.env.NODE_ENV
    });
});


app.post('/usuario',  [verificaToken, verificaAdminRole], function(req, res) {

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

app.put('/usuario/:id', [verificaToken, verificaAdminRole], function(req, res) {
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


app.get('/usuario/:id', [verificaToken, verificaAdminRole], function(req, res) {
    let id = req.params.id;

    Usuario.findById(id, (err, usuarioBd) => {

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




app.get('/usuario', verificaToken, (req, res) => {

    let pageIndex = req.query.pageIndex || 0;
    pageIndex = Number(pageIndex);

    let pageSize = req.query.pageSize || 5;
    pageSize = Number(pageSize);

    let rowsToSkip = pageIndex * pageSize;

    Usuario.find({ status: true }, 'name email role status google')
        .limit(pageSize)
        .skip(rowsToSkip)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ status: true }, (err, totalCount) => {
                res.status(200).json({
                    ok: true,
                    cantidad: usuarios.length,
                    totalRows: totalCount,
                    usuarios
                });
            });



        })
});

//eliminado logico
app.delete('/usuario/:id', [verificaToken, verificaAdminRole], function(req, res) {
    let id = req.params.id;

    let updateBody = { status: false };
    Usuario.findByIdAndUpdate(id, updateBody, { new: true }, (err, updatedUser) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!updatedUser) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        return res.status(200).json({
            ok: true,
            usuario: updatedUser
        });
    });
});

//eliminado físico
app.delete('/usuario2/:id', [verificaToken, verificaAdminRole], function(req, res) {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, deletedUser) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!deletedUser) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        return res.status(200).json({
            ok: true,
            usuario: deletedUser
        });
    });
});
module.exports = app;