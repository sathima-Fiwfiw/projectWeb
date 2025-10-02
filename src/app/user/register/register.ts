import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Location } from '@angular/common'; // 1. Import Location เข้ามา

@Component({
  selector: 'app-register',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

    // 2. "ฉีด" Location service เข้ามาใน constructor
  constructor(private location: Location) {}

  // 3. สร้างฟังก์ชัน goBack() เพื่อให้ HTML เรียกใช้
  goBack(): void {
    this.location.back();
  }

}


