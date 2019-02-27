const jwt = require('jsonwebtoken');

//========================================
// Verificar Token
//========================================

let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                error: {
                    message: "Token no válido"
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });

};

module.exports = { verificaToken };