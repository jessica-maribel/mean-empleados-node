
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private URL_API = 'http://localhost:3000/api/empleados';
  empleados: Empleado[] = [];
  selectedEmpleado: Empleado = { nombre: '', cargo: '', departamento: '', sueldo: 0 };

  constructor(private http: HttpClient) {}

  // LISTAR
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.URL_API);
  }

  // CREAR
  createEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.URL_API, empleado);
  }

  // ACTUALIZAR
  updateEmpleado(id: string, data: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.URL_API}/${id}`, data);
  }

  // ELIMINAR
  deleteEmpleado(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL_API}/${id}`);
  }
}