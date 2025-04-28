import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Color {
  id: number;
  nom: string;
  codeCouleur: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  constructor(private http: HttpClient) {}

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>('assets/colors.json');
  }
}
