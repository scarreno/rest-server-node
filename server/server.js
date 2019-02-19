require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Start Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
    // End Middleware


//Start Endpoints
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

//End Endpoints

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${ process.env.PORT }`);
});