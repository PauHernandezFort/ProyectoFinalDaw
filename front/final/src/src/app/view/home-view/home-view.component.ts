import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MapaAnunciosComponent } from '../../mapa-anuncios/mapa-anuncios.component';
import { CrearAnuncioComponent } from '../../crear-anuncio/crear-anuncio.component';
import { AnuncioCardComponent } from '../../components/anuncio-card/anuncio-card.component';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-home-view',
  imports: [HeaderComponent,MapaAnunciosComponent,CrearAnuncioComponent,AnuncioCardComponent,CommonModule,CarouselModule],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css'
})
export class HomeViewComponent {
  anuncios: any[] = [];
  anunciosPorCategoria: { [key: string]: any[] } = {};
  serverUrl = 'http://100.25.128.174';
  categorias: string[] = [
    'Electronica',
    'Soporte Tecnologico',
    'Jardineria',
    'Animales',
    'Tareas del Hogar',
    'Ayuda a Personas Mayores',
    'Educacion y Apoyo',
    'Transporte',
    'Compras y Recados',
    'Cuidado Infantil',
    'otros'
  ];

  responsiveOptions = [
    {
      breakpoint: '99999px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  coordenadasSeleccionadas: { lat: number; lng: number } | null = null;

  centrarMapa(coords: { lat: number; lng: number }) {
    this.coordenadasSeleccionadas = coords;
    window.scrollTo({
      top: document.getElementById('mapa')?.offsetTop ?? 0,
      behavior: 'smooth' 
    });
  }
  
  guardarAnuncios(anuncios: any[]) {
    this.anuncios = anuncios;
    this.anunciosPorCategoria = {};
    this.categorias.forEach(cat => {
      this.anunciosPorCategoria[cat] = anuncios.filter(a =>
        (a.tipo || 'otros') === cat
      );
    });
  }
  
}
