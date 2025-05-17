import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { UserService } from '../../services/user.service';
import { AnunciosService } from '../../services/anuncios.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'; // opcional si quieres toasts también
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
@Component({
  selector: 'app-perfil-view',
  standalone: true,
  imports: [CardModule, CommonModule, ConfirmDialogModule, ToastModule,DialogModule,FormsModule,HeaderComponent],
  providers: [ConfirmationService, MessageService],
  templateUrl: './perfil-view.component.html',
  styleUrls: ['./perfil-view.component.css']
})
export class PerfilViewComponent {
  serverUrl = 'http://127.0.0.1:8000';
  fotoPerfil: string | null = null;
  nombreUsuario: string = '';
  descripcion: string = '';
  productos: any[] = [];
  ofertas: string = '0';
  display: boolean = false;
  productoEditar: any = {}; // Aquí se guardarán los datos del producto a editar
  isLoading: boolean = false;
  constructor(
    private userService: UserService,
    private anunciosService: AnunciosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const idUsuario = localStorage.getItem('usuarioId');
    
    if (!idUsuario) {
      console.warn('No hay ID de usuario en localStorage');
      return;
    }

    this.userService.getUser(idUsuario).subscribe({
      next: (user: any) => {
        this.nombreUsuario = user.username || 'Desconocido';
        this.descripcion = user.descripcion || 'Sin descripción';
        this.fotoPerfil = user.imagen || null;
        this.ofertas = user.ofertas?.length?.toString() || '0';

        const anunciosUrls: string[] = user.anuncios || [];

        if (anunciosUrls.length === 0) {
          this.productos = [];
          return;
        }

        const peticiones = anunciosUrls.map(url =>
          this.anunciosService.getAnuncioPorUrl(url)
        );

        forkJoin(peticiones).subscribe({
          next: (anunciosCompletos: any[]) => {
            this.productos = anunciosCompletos;
            console.log(this.productos)
          },
          error: (err) => {
            console.error('Error al obtener los anuncios:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al cargar el usuario:', err);
      }
    });
  }
  getFullImageUrl(imagePath: string): string {
    if (imagePath) {
      return `${this.serverUrl}/${imagePath}`;
    } else {
      return 'https://via.placeholder.com/300x200?text=Sin+Imagen';  // Imagen predeterminada si no hay foto
    }
  }
  eliminarProducto(id: number): void {
    this.anunciosService.eliminarAnuncio(id).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Producto eliminado',
          detail: `El producto con ID ${id} fue eliminado correctamente`
        });
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el producto'
        });
      }
    });
  }
  confirmarEliminacion(id: number) {
    this.confirmationService.confirm({
      message: '¿Quieres eliminar este producto?',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.eliminarProducto(id);
      }
    });
  }
  // Este método abre el dialog con los datos del producto a editar
  editarProducto(producto: any): void {
    this.productoEditar = { ...producto }; // Copia para no modificar directamente el original
    this.display = true;
  }
  guardarEdicion(): void {
    this.isLoading = true; // Activar el spinner antes de hacer la llamada a la API
  
    this.anunciosService.editarAnuncio(this.productoEditar.id, this.productoEditar).subscribe({
      next: () => {
        this.isLoading = false; // Desactivar el spinner cuando la API responde
        this.display = false; // Cierra el dialog
        this.messageService.add({
          severity: 'success',
          summary: 'Producto editado',
          detail: 'El producto se ha editado correctamente'
        });
  
   
        const index = this.productos.findIndex(p => p.id === this.productoEditar.id);
        if (index !== -1) {
          this.productos[index] = { ...this.productoEditar };
        }
      },
      error: (err: any) => {
        this.isLoading = false; // Desactivar el spinner en caso de error
        console.error('Error al editar el producto:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar el producto'
        });
      }
    });
  }
  }