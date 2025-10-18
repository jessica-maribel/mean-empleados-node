import { Component, OnInit, inject } from '@angular/core';
//import { NgFor, NgFor, FormsModule, NgForm } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-empleado-component',
  imports: [ CommonModule, RouterModule ],
  
  templateUrl: './empleado-component.html',
  styleUrl: './empleado-component.css'
})
export class EmpleadoComponent {
  empleadoService = inject(EmpleadoService);

  ngOnInit() {
    this.getEmpleados();
  }

  getEmpleados() {
    this.empleadoService.getEmpleados().subscribe({
      next: (res) => (this.empleadoService.empleados = res),
      error: (err) => console.error(err),
    });
  }

  /*addEmpleado(form: NgForm) {
    this.empleadoService.createEmpleado(form.value).subscribe({
      next: () => {
        this.getEmpleados();
        form.resetForm();
      },
      error: (err) => console.error(err),
    });
  }*/
}
