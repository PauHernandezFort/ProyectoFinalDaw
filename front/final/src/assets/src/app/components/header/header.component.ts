import { Component, Input } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports:[MenubarModule,CommonModule,BadgeModule,RouterLink,RouterLinkActive]
})
export class HeaderComponent {
  items: any[];


  constructor() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        route: `/home`
      },
      {
        label: 'Crear anuncio',
        icon: 'pi pi-box',
        route: `/crearAnuncio`
      },
      {
        label: 'Perfil',
        icon: 'pi pi-cog',
        route: `/perfil`,
      },
    ];
  }
}
