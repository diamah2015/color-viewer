import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorComponent } from './color.component';
import { ColorService } from '../../services/color.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('ColorComponent', () => {
  let component: ColorComponent;
  let fixture: ComponentFixture<ColorComponent>;
  let service: ColorService;

  // Step 1: Configure the testing module before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],  // Import modules required by the component
      declarations: [ColorComponent],                   // Declare the component to be tested
      providers: [ColorService]                          // Provide the ColorService
    }).compileComponents();

    // Step 2: Create the component and inject the service
    fixture = TestBed.createComponent(ColorComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ColorService);

    // Step 3: Mock the service method getColors() to return dummy data
    spyOn(service, 'getColors').and.returnValue(of([
      { id: 1, name: 'Rouge', colorCode: '#FF0000' },
      { id: 2, name: 'Vert', colorCode: '#00FF00' }
    ]));

    // Step 4: Trigger ngOnInit and data binding
    fixture.detectChanges();
  });

  // Step 5: Test case - Verify the component is created
  it('should create the component', () => {
    expect(component).toBeTruthy();  // The component should be successfully created
  });

  // Step 6: Test case - Verify that colors are loaded on initialization
  it('should load colors on init', () => {
    expect(component.colors.length).toBe(2);               // Should load two colors
    expect(component.colors[0].name).toBe('Rouge');         // Verify the first color's name
  });

  // Step 7: Test case - Verify that selecting a color updates selectedColor
  it('should set selectedColor when a color is selected (ngModel binding)', () => {
    const colorToSelect = { id: 2, name: 'Vert', colorCode: '#00FF00' };

    // Step 8: Simulate selecting a color
    component.selectedColor = colorToSelect;
    fixture.detectChanges();

    // Step 9: Assertions to verify selectedColor is correctly updated
    expect(component.selectedColor?.name).toBe('Vert');
    expect(component.selectedColor?.colorCode).toBe('#00FF00');
  });
});
