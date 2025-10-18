import { Routes } from '@angular/router';
import { EmpleadoComponent } from './components/empleado-component/empleado-component';
export const routes: Routes = [
    { path: '', redirectTo: 'empleado', pathMatch: 'full' },
    { path: 'empleado', component: EmpleadoComponent }
];
