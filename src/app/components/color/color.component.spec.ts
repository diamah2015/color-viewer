import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorComponent } from './color.component';
import { ColorService } from '../../services/color.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Assure-toi d'importer ce module
import { of } from 'rxjs';

describe('ColorComponent', () => {
  let component: ColorComponent;
  let fixture: ComponentFixture<ColorComponent>;
  let service: ColorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Ajoute HttpClientTestingModule ici
      declarations: [ColorComponent],
      providers: [ColorService]  // Fournisseur du service ColorService
    }).compileComponents();

    fixture = TestBed.createComponent(ColorComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ColorService);

    // Simuler la réponse du service pour les tests
    spyOn(service, 'getColors').and.returnValue(of([
      { id: 1, nom: 'Rouge', codeCouleur: '#FF0000' },
      { id: 2, nom: 'Vert', codeCouleur: '#00FF00' }
    ]));

    fixture.detectChanges(); // Déclenche ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load colors on init', () => {
    expect(component.colors.length).toBe(2); // Vérifie que les couleurs sont chargées
    expect(component.colors[0].nom).toBe('Rouge'); // Vérifie le nom de la première couleur
  });

  it('should set selectedColor when a color is selected', () => {
    component.onColorChange({ target: { value: '2' } } as any); // Simule la sélection de la couleur "Vert"
    expect(component.selectedColor?.nom).toBe('Vert'); // Vérifie que la couleur sélectionnée est correcte
    expect(component.selectedColor?.codeCouleur).toBe('#00FF00');
  });
});
