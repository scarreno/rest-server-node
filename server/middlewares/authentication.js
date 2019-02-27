const jwt = require('jsonwebtoken');

//========================================
// Verificar Token
//========================================

let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');

    /*
    res.json({
        token
    });
    */

    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });

};

module.exports = { verificaToken };