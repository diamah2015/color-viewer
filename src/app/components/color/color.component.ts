import { Component, OnInit } from '@angular/core';
import { Color, ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color',
  standalone: false,
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  selectedColor: Color | null = null; // <= null par défaut

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.colorService.getColors().subscribe(data => {
      this.colors = data;
      // Pas besoin de toucher selectedColor ici
    });
  }
}
