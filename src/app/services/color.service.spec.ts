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

  it('should retrieve colors from the API via GET and transform them', () => {
    const dummyColors = [
      { id: 1, nom: 'Rouge', codeCouleur: '#FF0000' },
      { id: 2, nom: 'Vert', codeCouleur: '#00FF00' }
    ];

    const expectedColors: Color[] = [
      { id: 1, name: 'Rouge', colorCode: '#FF0000' },
      { id: 2, name: 'Vert', colorCode: '#00FF00' }
    ];

    // Test pour vérifier que la méthode renvoie les données transformées
    service.getColors().subscribe(colors => {
      expect(colors.length).toBe(2);
      expect(colors).toEqual(expectedColors);  // Vérification de la transformation des données
    });

    const request = httpMock.expectOne('assets/colors.json');
    expect(request.request.method).toBe('GET');
    request.flush(dummyColors);  // Simule la réponse de l'API
  });

  it('should transform raw object Correctly',()=>
    {
      const rawColor={id:'1',nom:'Rouge',codeCouleur:'#FF0000'}
      const transformedColor=(service as any).transformColor(rawColor);
      expect(transformedColor).toEqual({id:'1',name:'Rouge',colorCode:'#FF0000'});
    })




});
