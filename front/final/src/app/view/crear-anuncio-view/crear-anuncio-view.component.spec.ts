import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAnuncioViewComponent } from './crear-anuncio-view.component';

describe('CrearAnuncioViewComponent', () => {
  let component: CrearAnuncioViewComponent;
  let fixture: ComponentFixture<CrearAnuncioViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAnuncioViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAnuncioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
