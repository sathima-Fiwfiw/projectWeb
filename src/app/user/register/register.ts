// src/app/auth/register/register.ts
import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { API_BASE } from '../../config/config';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  form: FormGroup;
  avatarFile?: File;
  avatarPreview: string | null = null;
  loading = false;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required]],
    });
  }

  goBack() {
    this.location.back();
  }

  onFilePicked(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files || !input.files.length) return;

    this.avatarFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => (this.avatarPreview = reader.result as string);
    reader.readAsDataURL(this.avatarFile);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('กรอกข้อมูลให้ครบและถูกต้องก่อนนะ');
      return;
    }
    if (this.form.value.password !== this.form.value.confirm) {
      alert('รหัสผ่านไม่ตรงกัน');
      return;
    }

    this.loading = true;

    const fd = new FormData();
    fd.append('username', String(this.form.value.username ?? ''));
    fd.append('email', String(this.form.value.email ?? ''));
    fd.append('password', String(this.form.value.password ?? ''));
    if (this.avatarFile) fd.append('avatar', this.avatarFile);

    this.http
      .post(`${API_BASE}/register`, fd)
      .subscribe({
        next: () => {
          alert('สมัครสำเร็จ! โปรดล็อคอิน');
          this.router.navigate(['/']); // ไปหน้า login (root) ของคุณ
        },
        error: (e) => {
          const msg =
            e?.error?.message || e?.error || e.message || 'ไม่ทราบสาเหตุ';
          alert('สมัครไม่สำเร็จ: ' + msg);
        },
      })
      .add(() => (this.loading = false));
  }
}
