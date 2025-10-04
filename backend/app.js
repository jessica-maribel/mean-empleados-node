const express=require('express');
const morgan=require('morgan');
const app=express();
//settings
app.set('puerto',process.env.PORT|| 3000);
app.set('nombreApp','Gestión de empleados');
app.use(morgan('dev'));
app.use('/api/empleados', require('./src/routes/empleados.routes.js'));
app.use(express.json());

module.exports=app;
