// src/app/auth/login.ts
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
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
 */
interface AuthResponse {
  token: string;
  role: string; // บทบาทของผู้ใช้ ('admin' หรือ 'user')
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    console.log('1. Login function called.'); // <--- DEBUG POINT 1

    if (this.form.invalid) {
      console.warn(
        '2. Form is INVALID! Stopping submission. Check input values.'
      ); // <--- DEBUG POINT 2
      // การทำงานจะถูกหยุดตรงนี้ ถ้าอีเมลว่าง, รหัสผ่านว่าง, หรืออีเมลรูปแบบไม่ถูกต้อง
      return;
    }

    console.log('3. Form is VALID. Sending API request...'); // <--- DEBUG POINT 3

    // เรียกใช้ API /login และกำหนด Type ของ Response เป็น AuthResponse
    this.http.post<AuthResponse>(`${API}/login`, this.form.value).subscribe({
      next: (res) => {
        console.log('4. API Success! Response:', res); // <--- DEBUG POINT 4
        // เก็บ JWT Token ไว้ใน Local Storage
        localStorage.setItem('token', res.token);

        // ตรวจสอบบทบาท (role) เพื่อนำทางไปยังหน้าต่าง ๆ
        if (res.role === 'admin') {
          console.log('5. Navigating to /homeAdmin');
          this.router.navigate(['/homeAdmin']);
        } else {
          console.log('5. Navigating to /home');
          this.router.navigate(['/home']);
        }
      },
      error: (e) => {
        console.error('6. Login Failed (API or Network Error):', e); // <--- DEBUG POINT 6
        alert('ล็อกอินไม่สำเร็จ: โปรดตรวจสอบอีเมลและรหัสผ่าน');
      },
    });
  }
}
