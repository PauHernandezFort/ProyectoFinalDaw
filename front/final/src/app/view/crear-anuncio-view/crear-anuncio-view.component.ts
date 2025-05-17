import { Component } from '@angular/core';
import { CrearAnuncioComponent } from '../../crear-anuncio/crear-anuncio.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-crear-anuncio-view',
  imports: [CrearAnuncioComponent, HeaderComponent],
  templateUrl: './crear-anuncio-view.component.html',
  styleUrl: './crear-anuncio-view.component.css'
})
export class CrearAnuncioViewComponent {
  constructor(private route: ActivatedRoute) { }
  id:string =''

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    console.log('ID recibida:', this.id);
  }
}
