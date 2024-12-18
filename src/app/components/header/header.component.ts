import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cartService = inject(CartService);
  title = signal<string>('Store');
  firstInputVal: any;
  secondInputVal: any;

  selectedUnit: { id: number; label: string; unit: string } = {
    id: 0,
    label: 'Kilometre',
    unit: 'km',
  };

  selectedUnitTwo: { id: number; label: string; unit: string } = {
    id: 1,
    label: 'Metre',
    unit: 'm',
  };


  showBtnClicked() {
    console.log('TEST BUTTON')
  }

  lengthOptions = [
    {
      id: 0,
      label: 'Kilometre',
      unit: 'km'
    },
    {
      id: 1,
      label: 'Metre',
      unit: 'm'
    },
    {
      id: 2,
      label: 'Centimetre',
      unit: 'cm'
    }
  ];

  unitChangeOne(event: Event): void {
    const target = event.target as HTMLSelectElement; // Type-cast the event target to HTMLSelectElement
    const unit = target.value;
    this.selectedUnit = this.lengthOptions.find((opt) => opt.unit === unit) || this.selectedUnit;
  }

  unitChangeTwo(event: Event): void {
    const target = event.target as HTMLSelectElement; // Type-cast the event target to HTMLSelectElement
    const unit = target.value;
    this.selectedUnitTwo = this.lengthOptions.find((opt) => opt.unit === unit) || this.selectedUnitTwo;
  }

  firstInputConv(value: number) {
    console.log(value)
    if (this.selectedUnit.unit === 'km') {
      this.secondInputVal = value
      if (this.selectedUnitTwo.unit === 'm') {
        this.secondInputVal = value * 1000
      }
      if (this.selectedUnitTwo.unit === 'cm') {
        this.secondInputVal = value * 10000
      }
    }
  }

  secondInputConv(value: number){
    if (this.selectedUnitTwo.unit === 'm') {
      this.firstInputVal = value
      if (this.selectedUnit.unit === 'km') {
        this.firstInputVal = value / 1000
      }
      if (this.selectedUnit.unit === 'cm') {
        this.firstInputVal = value / 10000
      }
    }
  }
}
