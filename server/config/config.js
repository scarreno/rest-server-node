//=====================================
// Puerto
//=====================================

process.env.PORT = process.env.PORT || 3000;


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
    urlDb = 'mongodb://dbuser:admin1234@udemy-cafe-shard-00-00-hkcs2.mongodb.net:27017,udemy-cafe-shard-00-01-hkcs2.mongodb.net:27017,udemy-cafe-shard-00-02-hkcs2.mongodb.net:27017/cafe?ssl=true&replicaSet=udemy-cafe-shard-0&authSource=admin&retryWrites=true';
}

process.env.URL_DB = urlDb;