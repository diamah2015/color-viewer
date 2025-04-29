import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay,Observable } from 'rxjs';

/**
 * Interface representing a normalized color object for the application.
 */
export interface Color {
  id: number;
  name: string;        // Name of the color
  colorCode: string;   // Hexadecimal color code
}

/**
 * Service responsible for loading and transforming color data from a JSON file.
 */
@Injectable({
  providedIn: 'root'
})
export class ColorService {   

  constructor(private http: HttpClient) {}

  /**
   * Fetches the list of colors from assets/colors.json
   * and transforms each entry into a Color object.
   * @returns Observable emitting an array of Color objects
   */
  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>('assets/colors.json').pipe(
      map(colors => colors.map(color => this.transformColor(color))) // Transform each color object to match the Color model
    );
  }

  /**
   * Transforms a raw color object into a Color model instance.
   * @param color Raw data from the JSON file
   * @returns Color object conforming to the Color interface
   */
  private transformColor(color: any): Color {
    return {
      id: color.id,
      name: color.nom,  
      colorCode: color.codeCouleur 

    };
  }
}
