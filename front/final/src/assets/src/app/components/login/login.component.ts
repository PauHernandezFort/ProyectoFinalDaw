import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule,ButtonModule],
  providers: []
})

export class LoginComponent {
  
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log('va')
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.loginForm.disable();

    this.userService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res)
        // Lógica para guardar token, redirigir, etc.
        console.log('Login correcto');
        const id = res.usuario.id;
        localStorage.setItem('usuarioId', id);

        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);

        this.isLoading = false;
        this.loginForm.enable();
      }
    });
  }
}
