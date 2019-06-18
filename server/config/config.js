//=====================================
// Puerto
//=====================================

process.env.PORT = process.env.PORT || 3001;
process.env.MONGO_PORT = process.env.MONGO_PORT || 27017;


//=====================================
// Entorno
//=====================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=====================================
// Base de datos
//=====================================

process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cafe';


process.env.URL_DB = process.env.MONGO_URI;

//=====================================
// Vencimiento Token (JWT)
// 60 Segundos * 60 minitos * 24 horas * 30 días
//=====================================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//=====================================
// Seed Token
//=====================================
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'sid-de-desarrollo';