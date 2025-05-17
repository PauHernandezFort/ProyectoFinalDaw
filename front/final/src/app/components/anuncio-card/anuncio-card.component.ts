import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-anuncio-card',
  templateUrl: './anuncio-card.component.html',
  styleUrls: ['./anuncio-card.component.css'],
  imports:[CardModule,ButtonModule]
})
export class AnuncioCardComponent {
  @Input() titulo: string = '';
  @Input() categoria: string = '';
  @Input() descripcion: string = '';
  @Input() correo: string = '';
  @Input() numero: number = 0;
  @Input() pago: number = 0;
  @Input() lat: number = 0;
  @Input() lng: number = 0;
  @Input()img:string=''

  @Output() clickUbicacion = new EventEmitter<{ lat: number; lng: number }>();

irAMapa(event: MouseEvent) {
  console.log('pepe')
  this.clickUbicacion.emit({ lat: this.lat, lng: this.lng });
  const button = event.target as HTMLButtonElement;
  button.blur();
}


}
