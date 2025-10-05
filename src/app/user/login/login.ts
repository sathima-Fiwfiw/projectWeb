// src/app/auth/login.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

// URL API Backend (Go)
const API = 'http://localhost:8080/api';

/**
 * Interface สำหรับโครงสร้างข้อมูลที่ได้รับจาก API หลังการล็อกอินสำเร็จ
 * โดยมีการเพิ่ม 'role' เข้ามา
 */
interface AuthResponse {
  token: string;
  role: string; // บทบาทของผู้ใช้ ('admin' หรือ 'user')
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, HttpClientModule, RouterModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.form.invalid) return;

    // เรียกใช้ API /login และกำหนด Type ของ Response เป็น AuthResponse
    this.http.post<AuthResponse>(`${API}/login`, this.form.value)
      .subscribe({
        next: (res) => {
          // เก็บ JWT Token ไว้ใน Local Storage
          localStorage.setItem('token', res.token);

          // ตรวจสอบบทบาท (role) เพื่อนำทางไปยังหน้าต่าง ๆ
          if (res.role === 'admin') {
            // ถ้าระบบส่ง role: 'admin' กลับมา ให้นำทางไปหน้า AdminHome
            this.router.navigate(['/HomeAdmin']);
          } else {
            // ถ้าเป็น role อื่น (เช่น 'user') ให้นำทางไปหน้า Home ทั่วไป
            this.router.navigate(['/Home']);
          }
        },
        error: (e) => {
          // ใช้ console.error แทน alert() เพื่อการ Debug ที่ดีกว่า
          console.error('Login Failed:', e);

          // แสดงข้อความแจ้งเตือนแก่ผู้ใช้ในรูปแบบที่สวยงามกว่า alert
          // (ในสถานการณ์จริง ควรใช้ MatSnackBar หรือ Modal)
          // เนื่องจากไม่มี MatSnackBar/Modal ในโค้ดตัวอย่าง จึงใช้ alert ชั่วคราว
          alert('ล็อกอินไม่สำเร็จ: โปรดตรวจสอบอีเมลและรหัสผ่าน');
        }
      });
  }
}
