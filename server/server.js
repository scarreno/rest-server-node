require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//Config global de Rutas
app.use('/api/v1', require('./routes/index'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


mongoose.connect(process.env.URL_DB, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log('ERROR de Conexión a MongoDB');
        console.log(err);
        throw err
    };

    console.log('Base de Datos Online!!!');

    //console.log(res);
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${ process.env.PORT }`);
});