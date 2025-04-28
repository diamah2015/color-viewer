import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ColorService, Color } from './color.service';

describe('ColorService', () => {
  let service: ColorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Ajout de HttpClientTestingModule
      providers: [ColorService]
    });
    service = TestBed.inject(ColorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // Vérifie que toutes les requêtes ont été traitées
  });

  it('should retrieve colors from the API via GET', () => {
    const dummyColors: Color[] = [
      { id: 1, nom: 'Rouge', codeCouleur: '#FF0000' },
      { id: 2, nom: 'Vert', codeCouleur: '#00FF00' }
    ];

    service.getColors().subscribe(colors => {
      expect(colors.length).toBe(2);
      expect(colors).toEqual(dummyColors);
    });

    const request = httpMock.expectOne('assets/colors.json');
    expect(request.request.method).toBe('GET');
    request.flush(dummyColors);  // Simule la réponse de l'API
  });
});
