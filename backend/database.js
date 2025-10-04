const monogoose = require('mongoose')
const URI = "mongodb://127.0.0.1:27017/usuarios_db";
monogoose.connect(URI)
    .then(db=> console.log('BD conectada'))
    .catch(err => console.error(err));

module.exports=monogoose;