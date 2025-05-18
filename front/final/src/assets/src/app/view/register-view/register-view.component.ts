import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../../components/register/register.component';
import { LoginComponent } from '../../components/login/login.component';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from '../../components/header/header.component';
@Component({
  selector: 'app-auth',
  standalone: true,
  // Importamos CommonModule y los componentes de Login y Registro
  imports: [CommonModule, LoginComponent, RegisterComponent,CardModule,HeaderComponent],
  templateUrl: './register-view.component.html',
  styleUrl: './register-view.component.css'
})
export class RegisterViewComponent {
  // Por defecto se muestra la vista de login
  isLogin: boolean = true;

  // Método para cambiar entre login y registro
  toggleAuth() {
    this.isLogin = !this.isLogin;
  }
}
