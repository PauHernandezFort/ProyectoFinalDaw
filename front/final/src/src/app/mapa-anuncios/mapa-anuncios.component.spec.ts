import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaAnunciosComponent } from './mapa-anuncios.component';

describe('MapaAnunciosComponent', () => {
  let component: MapaAnunciosComponent;
  let fixture: ComponentFixture<MapaAnunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaAnunciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
