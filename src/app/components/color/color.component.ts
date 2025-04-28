import { Component, OnInit } from '@angular/core';
import { Color, ColorService } from '../../services/color.service.spec';

@Component({
  selector: 'app-color',
  standalone: false,
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  selectedColorId?: number;

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.colorService.getColors().subscribe(data => {
      console.log(data)
      this.colors = data;
    });
  }

  onColorChange(event: Event): void {
    const selectedId = Number((event.target as HTMLSelectElement).value);
    this.selectedColorId = selectedId;
  }

  get selectedColor(): Color | undefined {
    return this.colors.find(color => color.id === this.selectedColorId);
  }
}
