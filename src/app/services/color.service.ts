import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Color {
  id: number;
  name: string;        // Name of the color
  colorCode: string;   // Hex color code
}

@Injectable({
  providedIn: 'root'
})
export class ColorService {   // <= Service au singulier
  constructor(private http: HttpClient) {}

  getColors(): Observable<Color[]> {
    
    return this.http.get<Color[]>('assets/colors.json').pipe(
      map(colors => colors.map(color => this.transformColor(color))) // Appliquer la transformation
    );    
  }
  private transformColor(color: any): Color {
    return {
      id: color.id,
      name: color.nom,  // 'nom' devient 'name'
      colorCode: color.codeCouleur // 'codeCouleur' devient 'colorCode'
    };
  }
}
