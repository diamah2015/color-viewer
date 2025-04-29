import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay,Observable } from 'rxjs';

export interface Color {
  id: number;
  name: string;        
  colorCode: string;   
}

@Injectable({
  providedIn: 'root'
})
export class ColorService {   
  constructor(private http: HttpClient) {}

  getColors(): Observable<Color[]> {
    
    return this.http.get<Color[]>('assets/colors.json').pipe(
      map(colors => colors.map(color => this.transformColor(color))) // Appliquer la transformation
    );    
  }
  private transformColor(color: any): Color {
    return {
      id: color.id,
      name: color.nom,  
      colorCode: color.codeCouleur 
    };
  }
}
