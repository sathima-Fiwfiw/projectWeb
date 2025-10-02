import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule // สำหรับ routerLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
 constructor(private router: Router) {} // 2. Inject Router เข้ามาใช้งาน

  // 3. สร้างฟังก์ชัน Register() ที่ถูกเรียกจาก HTML
  Register(): void {
    // สั่งให้นำทางไปที่ path '/register'
    this.router.navigate(['/register']);
  }

}
