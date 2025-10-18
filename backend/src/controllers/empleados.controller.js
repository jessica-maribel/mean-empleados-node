const empleadoCtrl={};
const Empleado=require('../models/Empleado');

empleadoCtrl.getEmpleados= async(req, res)=>{
  try {
    const empleados = await Empleado.find();
    res.json(empleados); 
    res.send("Listo");  
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
}

empleadoCtrl.getEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const emp = await Empleado.findById(id);
    if (!emp) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener empleado', error: err.message });
  }
};


empleadoCtrl.createEmpleado= async(req,res)=>{
    const empleado=new Empleado({
    nombre: req.body.nombre,
    cargo: req.body.cargo,
    departamento:req.body.departamento,
    sueldo:req.body.sueldo
    });
    console.log(empleado);
    await empleado.save();
    res.json('status: Datos guardados');
}

empleadoCtrl.editEmpleado=async(req,res)=>{
    try {
    const { id } = req.params;
    const { nombre, cargo, departamento, sueldo } = req.body;
    const actualizado = await Empleado.findByIdAndUpdate(
      id,
      { $set: { nombre, cargo, departamento, sueldo } },
      { new: true }
    );
    if (!actualizado) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json({ status: 'Datos actualizados', empleado: actualizado });
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar', error: err.message });
  }
}

empleadoCtrl.deleteEmpleado=async(req,res)=>{
    try {
    const { id } = req.params;
    const eliminado = await Empleado.findByIdAndDelete(id);
    if (!eliminado) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json({ status: 'Empleado ha sido removido' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar', error: err.message });
  }
}

module.exports=empleadoCtrl;
