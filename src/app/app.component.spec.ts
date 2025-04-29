import { ComponentFixture, TestBed } from '@angular/core/testing';  // Importe les outils de test nécessaires pour les composants Angular
import { AppComponent } from './app.component';  // Importe le composant à tester
import { NO_ERRORS_SCHEMA } from '@angular/core';  // Permet d'ignorer les erreurs liées aux composants non déclarés dans le test

describe('AppComponent', () => {
  
  // Déclarations des variables nécessaires pour les tests
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  // beforeEach est exécuté avant chaque test pour préparer le module de test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],  // Déclare le composant à tester
      schemas: [NO_ERRORS_SCHEMA]  // Ignore les erreurs pour les composants inconnus dans le template
    }).compileComponents();  // Compile les composants afin de les rendre prêts à l'exécution

    // Crée une instance de AppComponent pour pouvoir tester ses propriétés et comportements
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;  // Récupère l'instance du composant
    fixture.detectChanges();  // Déclenche la détection des changements pour initialiser l'état du composant
  });

  // Test 1 : Vérifie que le composant AppComponent est bien créé
  it('should create the app', () => {
    expect(app).toBeTruthy();  // Vérifie que l'instance du composant existe et est valide
  });

});
