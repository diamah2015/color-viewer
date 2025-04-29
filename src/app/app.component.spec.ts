import { ComponentFixture, TestBed } from '@angular/core/testing';  // Import necessary Angular testing utilities
import { AppComponent } from './app.component';  // Import the component to be tested
import { NO_ERRORS_SCHEMA } from '@angular/core';  // Schema to ignore unknown elements and attributes in templates

describe('AppComponent', () => {
  
  // Declare variables for the component instance and the test fixture
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  // Step 1: Set up the testing module before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],  // Declare the AppComponent for testing
      schemas: [NO_ERRORS_SCHEMA]     // Ignore errors for unknown components in the template
    }).compileComponents();           // Compile the components to prepare them for testing

    // Step 2: Create an instance of AppComponent
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;  // Get the component instance
    fixture.detectChanges();          // Trigger initial data binding and lifecycle hooks
  });

  // Step 3: Test to verify that the component is created successfully
  it('should create the app', () => {
    expect(app).toBeTruthy();  // The component instance should exist and be valid
  });

});
