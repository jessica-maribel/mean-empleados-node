const { Router } = require('express');
const router = Router();


const empleadosController = require('../controllers/empleados.controller.js');


router.get('/', empleadosController.getEmpleados);
router.post('/create', empleadosController.createEmpleado);
router.get('/:id', empleadosController.getEmpleado);
router.put('/:id', empleadosController.editEmpleado);
router.delete('/:id', empleadosController.deleteEmpleado);

module.exports = router;
