import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,ButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registroForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    // Creación del formulario reactivo
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      descripcion: [''],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
     if (this.registroForm.invalid) return;

  this.isLoading = true;
  this.registroForm.disable();

  const formValues = this.registroForm.value;
  const payload = {
    username: formValues.username,
    correo: formValues.email,  // Mapear email a correo
    fechaCreacion: new Date().toISOString(),  // Fecha actual en formato ISO
    descripcion: formValues.descripcion,
    puntuacion: 0,  // Valor fijo de 0 para puntuación
    password: formValues.password
  };

  this.userService.setUser(payload).subscribe({
    next: (res) => {
      console.log('Usuario registrado:', res);
      this.isLoading = false;
      this.registroForm.enable();
    },
    error: (err) => {
      console.error('Error al registrar:', err);
      this.isLoading = false;
      this.registroForm.enable();
    }
  });
  }
  }
