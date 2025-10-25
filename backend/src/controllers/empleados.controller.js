const empleadoCtrl={};
const Empleado=require('../models/Empleado');

empleadoCtrl.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    return res.status(200).json(empleados); 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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


empleadoCtrl.createEmpleado = async (req, res) => {
  try {
    const { nombre, cargo, departamento, sueldo } = req.body;

    // Validación de campos
    if (!nombre || !cargo || !departamento || !sueldo) {
      return res.status(400).json({ 
        message: "Error: faltan campos obligatorios", 
        missingFields: {
          nombre: !nombre,
          cargo: !cargo,
          departamento: !departamento,
          sueldo: !sueldo
        }
      });
    }

    const empleado = new Empleado({ nombre, cargo, departamento, sueldo });
    await empleado.save();

    return res.status(201).json({ message: "Empleado creado", empleado });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear empleado", error: error.message });
  }
};



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
