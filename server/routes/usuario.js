const express = require('express');
const app = express();

app.get('/usuarios', function(req, res) {
    res.json('get usuario');
});

app.post('/usuario', function(req, res) {

    let body = req.body;

    if (body.name === undefined) {
        res.status(400).json({
            ok: false,
            message: "Nombre requerido"
        });
    } else {
        res.json({ persona: body });
    }

});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;

    res.json({
        id
    });
});

module.exports = app;