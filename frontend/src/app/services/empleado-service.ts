import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private http = inject(HttpClient);
  private URL_API = 'http://localhost:3000/api/empleados';

  empleados: Empleado[] = [];
  selectedEmpleado: Empleado = {
    nombre: '',
    cargo: '',
    departamento: '',
    sueldo: 0,
  };

  getEmpleados() {
    return this.http.get<Empleado[]>(this.URL_API);
  }

  createEmpleado(empleado: Empleado) {
    return this.http.post(this.URL_API, empleado);
  }
}
