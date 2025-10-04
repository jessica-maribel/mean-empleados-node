const empleadoCtr1={};
const Empleado=require(' .. /models/Empleado');

empleadoCtrl.getEmpleados=(req,res)=>{
    res.send('get empleados')
}
empleadoCtrl.createEmpleado=(req,res)=>{
    res.send('create empleados')
}
empleadoCtrl.getEmpleado=(req,res)=>{}
empleadoCtrl.editEmpleado=(req,res)=>{}
empleadoCtrl.deleteEmpleado=(req,res)=>{}

module.exports=empleadoCtrl;
