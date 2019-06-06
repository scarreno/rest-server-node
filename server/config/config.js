//=====================================
// Puerto
//=====================================

process.env.PORT = process.env.PORT || 3001;


//=====================================
// Entorno
//=====================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=====================================
// Base de datos
//=====================================

let urlDb;

if (process.env.NODE_ENV === 'dev') {
    urlDb = 'mongodb://localhost:27017/cafe';
} else {
    urlDb = process.env.MONGO_URI;
}

process.env.URL_DB = urlDb;

//=====================================
// Vencimiento Token (JWT)
// 60 Segundos * 60 minitos * 24 horas * 30 días
//=====================================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//=====================================
// Seed Token
//=====================================
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'sid-de-desarrollo';