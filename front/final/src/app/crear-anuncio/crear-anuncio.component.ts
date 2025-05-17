import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnunciosService } from '../services/anuncios.service';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
@Component({
  selector: 'app-crear-anuncio',
  templateUrl: './crear-anuncio.component.html',
  imports: [CommonModule, FormsModule, DropdownModule,FileUploadModule],
  styleUrls: ['./crear-anuncio.component.css']
})
export class CrearAnuncioComponent implements OnInit {
  
  mapa!: L.Map;
  marcador!: L.Marker;
  lat: number | null = null;
  lng: number | null = null;
  imagenBase64: string = '';
 idUsuario = localStorage.getItem('usuarioId');

  titulo: string = '';
  correo: string = '';
  numero: number | null = null;
  pago: number | null = null;
  fecha: string = '';
  descripcion: string = '';
  categoria: string = ''
  categorias = [
    { label: 'Electronica', value: 'Electronica' },
    { label: 'Soporte Tecnologico', value: 'Soporte Tecnologico' },
    { label: 'Jardineria', value: 'Jardineria' },
    { label: 'Animales', value: 'Animales' },
    { label: 'Tareas del Hogar', value: 'Tareas del Hogar' },
    { label: 'Ayuda a Personas Mayores', value: 'Ayuda a Personas Mayores' },
    { label: 'Educacion y Apoyo', value: 'Educacion y Apoyo' },
    { label: 'Transporte', value: 'Transporte' },
    { label: 'Compras y Recados', value: 'Compras y Recados' },
    { label: 'Cuidado Infantil', value: 'Cuidado Infantil' },
    { label: 'Otros', value: 'Otros' }
  ]
  constructor(private anunciosService: AnunciosService, private router: Router) { }
  isLoading: boolean = false;
  ngOnInit(): void {
    this.mapa = L.map('mapa').setView([39.4699, -0.3763], 13); // Centro inicial: Valencia

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);

   
    const customIcon = L.divIcon({
      className: 'leaflet-primeng-icon', // Clase para el div que contiene el icono
      html: `<i class="pi pi-map-marker" style="font-size: 24px; color: #28a745;"></i>`, // Icono de PrimeNG
      iconSize: [32, 32], 
      iconAnchor: [16, 32],
      popupAnchor: [0, -32], 
    });

    this.mapa.on('click', (e: L.LeafletMouseEvent) => {
      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;

      // Si ya existe el marcador, actualiza la posición
      if (this.marcador) {
        this.marcador.setLatLng(e.latlng);
      } else {
        // Si no existe, crea un nuevo marcador con el icono
        this.marcador = L.marker(e.latlng, { icon: customIcon }).addTo(this.mapa);
      }
    });
  }
  onImageSelect(event: any): void {
    const file = event.files[0];
  
    if (!file) return;
  
    const maxSizeMB = 2;
    const maxWidth = 500;
    const maxHeight = 250;
  
    // Validar tamaño en MB
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`La imagen no puede superar los ${maxSizeMB} MB.`);
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        if (img.width > maxWidth || img.height > maxHeight) {
          alert(`La imagen no puede superar los ${maxWidth}x${maxHeight} píxeles.`);
          return;
        }
  
        // Todo OK: guardar base64
        this.imagenBase64 = reader.result as string;
        console.log('Imagen válida en base64:', this.imagenBase64);
      };
      img.src = reader.result as string;
    };
  
    reader.readAsDataURL(file);
  }
  

  crearAnuncio() {
    console.log( this.categoria)
    const anuncio = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      telefono: this.numero !== null ? Number(this.numero) : null, 
      correo: this.correo,
      usuario_id: `http://127.0.0.1:8000/api/usuarios/${this.idUsuario}`,  
      estado: "activo", 
      precio: this.pago || 0,  
      tipo: this.categoria,  
      fechaCreacion: new Date().toISOString(),  
      fecha: this.fecha,  
      lat: this.lat || 0,  
      lng: this.lng || 0,  
      imagen: this.imagenBase64,  

    };

    // Usamos el servicio para crear el anuncio
    this.anunciosService.setAnuncio(anuncio).subscribe(
      (response) => {
        console.log('Anuncio creado:', response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al crear el anuncio:', error);
      }
    );
  }
  
}

