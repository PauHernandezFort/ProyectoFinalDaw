import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterViewComponent } from './view/register-view/register-view.component';
import { RegisterComponent } from "./components/register/register.component";
import { HeaderComponent } from './components/header/header.component';
import {  OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    const idUsuario = localStorage.getItem('usuarioId');
    if (!idUsuario) {
      this.router.navigate(['/register']);  // Redirige al registro si no hay usuarioId
    }
  }
}

