
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EmpleadoService } from '../services/empleado.service'; 
import { Empleado } from '../models/empleado';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  editingId: string | null = null;
  loading = false;

  constructor(public empleadoService: EmpleadoService) {}

  ngOnInit(): void { 
    this.getEmpleados(); 
  }

  getEmpleados(): void {
    this.loading = true;
    this.empleadoService.getEmpleados().subscribe({
      next: (res: Empleado[]) => { 
        this.empleadoService.empleados = res; 
        this.loading = false; 
      },
      error: (err: any) => { 
        console.error(err); 
        this.loading = false; 
      }
    });
  }

  editEmpleado(e: Empleado): void {
    this.empleadoService.selectedEmpleado = { ...e };
    this.editingId = e._id ?? null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Guardar (crear o actualizar según editingId)
  submit(form: NgForm): void {
    if (form.invalid) return;
    const data = form.value as Empleado;
    
    if (this.editingId) {
      this.empleadoService.updateEmpleado(this.editingId, data).subscribe({
        next: () => { 
          this.resetForm(form); 
          this.getEmpleados(); 
        },
        error: (err: any) => console.error(err) 
      });
    } else {
      this.empleadoService.createEmpleado(data).subscribe({
        next: () => { 
          this.resetForm(form); 
          this.getEmpleados(); 
        },
        error: (err: any) => console.error(err) 
      });
    }
  }

  // Eliminar
  deleteEmpleado(id?: string): void {
    if (!id) return;
    if (!confirm('¿Deseas eliminar este empleado?')) return;
    
    this.empleadoService.deleteEmpleado(id).subscribe({
      next: () => this.getEmpleados(),
      error: (err: any) => console.error(err) 
    });
  }

  // Limpiar
  resetForm(form: NgForm): void {
    this.editingId = null;
    this.empleadoService.selectedEmpleado = { 
      nombre: '', 
      cargo: '', 
      departamento: '', 
      sueldo: 0 
    };
    form.resetForm(this.empleadoService.selectedEmpleado);
  }
}