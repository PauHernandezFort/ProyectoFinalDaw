import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';
import { AnunciosService } from '../services/anuncios.service';

@Component({
  selector: 'app-mapa-anuncios',
  templateUrl: './mapa-anuncios.component.html',
  styleUrls: ['./mapa-anuncios.component.css']
})
export class MapaAnunciosComponent implements OnInit {
  private mapa!: L.Map;
  @Output() anunciosCargados = new EventEmitter<any[]>();
  @Input() coordenadasSeleccionadas: { lat: number; lng: number } | null = null;
  serverUrl = 'http://100.25.128.174';

  constructor(private anunciosService: AnunciosService) { }

  ngOnChanges() {
    if (this.mapa && this.coordenadasSeleccionadas) {
      const { lat, lng } = this.coordenadasSeleccionadas;
      this.mapa.setView([lat, lng], 16);
    }
  }

  ngOnInit(): void {
    // Inicia el mapa
    this.mapa = L.map('mapa').setView([39.4699, -0.3763], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);

    // Obtener los anuncios
    this.anunciosService.getAnuncios().subscribe({
      next: (response) => {
        const anuncios = response['member'] ?? [];

        this.anunciosCargados.emit(anuncios);

        anuncios.forEach((anuncio: any) => {
          if (anuncio.lat && anuncio.lng) {
            console.log(anuncios)
            const icon = this.getIconForCategory(anuncio.tipo);

            // Crea el marcador con el icono correspondiente
            L.marker([anuncio.lat, anuncio.lng], { icon: icon as L.Icon }) // Aquí se asegura que el icono es de tipo L.Icon
            .addTo(this.mapa)
            .bindPopup(`
              <div class="card shadow-sm border-0" style="width: 18rem; background-color: #f8f9fa; color: #343a40;">
                <img src="${this.serverUrl + '/' + anuncio.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}" class="card-img-top" alt="Producto">
                <div class="card-body">
                  <h5 class="card-title" style="color: #28a745;">${anuncio.titulo}</h5>
                  <p class="card-text">Descripcion:${anuncio.descripcion}</p>
                  <p class="mb-1" style="color: #6c757d;"><strong>Correo:</strong> ${anuncio.correo}</p>
                  <p class="mb-1" style="color: #6c757d;"><strong>Numero:</strong> ${anuncio.telefono}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold" style="color: #218838;"> Pago:${anuncio.precio} €</span>
                  </div>
                </div>
              </div>
            `);
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar los anuncios', error);
      }
    });
  }
  private getIconForCategory(categoria: string): L.DivIcon { 
    let iconClass = 'pi pi-map-marker'; 
    let iconColor = '#28a745'; 
    switch (categoria) {
      case 'Electronica':
        iconClass = 'pi pi-tv';
        iconColor = '#28a745';
        break;
      case 'Jardineria':
        iconClass = 'pi pi-user-plus';
        iconColor = '#28a745'; 
        break;
      case 'Animales':
        iconClass = 'pi pi-tag';
        iconColor = '#28a745'; 
        break;
      case 'Tareas del Hogar':
        iconClass = 'pi pi-home';
        iconColor = '#28a745'; 
        break;

      case 'Soporte Tecnologico':
        iconClass = 'pi pi-desktop';
        iconColor = '#28a745'; 
        break;
      case 'Ayuda a Personas Mayores':
        iconClass = 'pi pi-hourglass';
        iconColor = '#28a745'; 
        break;
      case 'Compras y Recados':
        iconClass = 'pi pi-cart-plus';
        iconColor = '#28a745';
        break;
        case 'Cuidado Infantil':
        iconClass = 'pi pi-bolt';
        iconColor = '#28a745';
        break;
        case 'Educacion y Apoyo':
        iconClass = 'pi pi-book';
        iconColor = '#28a745'; 
        break;
        case 'Transporte':
          iconClass = 'pi pi-car';
          iconColor = '#28a745'; 
          break;
      default:
        break;
    }

    return L.divIcon({
      className: 'leaflet-primeng-icon',
      html: `<i class="${iconClass}" style="font-size: 24px; color: ${iconColor};"></i>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }
}