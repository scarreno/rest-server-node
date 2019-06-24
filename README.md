# Rest Server App

Esta aplicación nace a partir del curso de NodeJS de udemy.

Cuenta con CRUD de servicios para una entidad de tipo Usuario.
Se requiere una MongoDb para que funcione.


## Instalación

Luego de descargar el proyecto, ejecutar el comando:
```bash
npm install
```

## Uso

Para ejecutar la aplicación:
```bash
npm start
```

Esto lanzará la aplicación en la url http://localhost:3000,para ver una definición swagger de la misma, acceder a http://localhost:3000/api-docs



## Mongo DB

Puede crear de forma gratuita una MongoDb en el sitio https://cloud.mongodb.com/

O

Puede ocupar la imagen de docker:
```bash
docker run --name MongoDB -e MONGO_INITDB_ROOT_USERNAME=sa -e MONGO_INITDB_ROOT_PASSWORD=AdminPassword$ --restart=always -d -p 27018:27017 mongo mongod --auth
```
En la MongoDb, crear un cluster, y en el crear la colección usuarios.


## Imagen Docker

Esta api se encuentra disponible en docker, para usarla, ejecutar el siguiente comando

```bash
docker run -p 81:3001  -d sergiocarreno/rest-server-node:v1
```
El servidor funcionará en la url http://localhost:81/api-docs

Nota: se debe contar con una MongoDB corriendo en el puerto 27017