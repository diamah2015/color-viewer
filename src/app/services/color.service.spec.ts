import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ColorService, Color } from './color.service';

describe('ColorService', () => {
  let service: ColorService;
  let httpMock: HttpTestingController;

  // Step 1: Set up the testing module before each test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Import module to mock HTTP requests
      providers: [ColorService]             // Provide the ColorService
    });

    // Inject the service and the HTTP testing controller
    service = TestBed.inject(ColorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Step 2: Verify after each test that no unexpected HTTP requests remain
  afterEach(() => {
    httpMock.verify();  // Ensure all expected HTTP requests were made
  });

  // Step 3: Test case - Validate that getColors() fetches and transforms the data correctly
  it('should retrieve colors from the API via GET and transform them', () => {
    // Define the dummy raw data that would be returned by the fake API
    const dummyColors = [
      { id: 1, nom: 'Rouge', codeCouleur: '#FF0000' },
      { id: 2, nom: 'Vert', codeCouleur: '#00FF00' }
    ];

    // Define the expected transformed data after applying transformColor
    const expectedColors: Color[] = [
      { id: 1, name: 'Rouge', colorCode: '#FF0000' },
      { id: 2, name: 'Vert', colorCode: '#00FF00' }
    ];

    // Step 4: Call the getColors() method
    service.getColors().subscribe(colors => {
      // Step 5: Assertions to verify the correct behavior
      
      // Verify that we received two colors
      expect(colors.length).toBe(2);
      
      // Verify that the transformation was applied correctly
      expect(colors).toEqual(expectedColors);
    });

    // Step 6: Expect a single GET request to the correct URL
    const request = httpMock.expectOne('assets/colors.json');

    // Step 7: Verify that the request method was GET
    expect(request.request.method).toBe('GET');

    // Step 8: Simulate the API returning the dummy data
    request.flush(dummyColors);
  });

  it('should transform raw object Correctly',()=>
    {
      const rawColor={id:'1',nom:'Rouge',codeCouleur:'#FF0000'}
      const transformedColor=(service as any).transformColor(rawColor);
      expect(transformedColor).toEqual({id:'1',name:'Rouge',colorCode:'#FF0000'});
    })

    it('should return an empty array when the API returns no colors', () => {
      // Call the service method and subscribe to the result
      service.getColors().subscribe(colors => {
        // Verify that the returned array is exactly empty
        expect(colors).toEqual([]);
        // Verify that the array length is 0
        expect(colors.length).toBe(0);
      });
    
      // Expect a GET request to the correct JSON file
      const request = httpMock.expectOne('assets/colors.json');
      // Confirm the request method is GET
      expect(request.request.method).toBe('GET');
      // Simulate an API response with an empty array
      request.flush([]);
    });
    


});
