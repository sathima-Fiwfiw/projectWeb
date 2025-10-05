// profileuser.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
// import { apiUrl } from '../config/config'; // หากต้องการใช้ apiUrl helper

@Component({
  selector: 'app-profileuser',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, HttpClientModule],
  templateUrl: './profileuser.html',
  styleUrls: ['./profileuser.scss'],
})
export class Profileuser implements OnInit {
  // Model สำหรับเก็บข้อมูลผู้ใช้
  userProfile = {
    username: 'Loading...',
    email: 'loading@example.com',
    password: '',
    profileImageUrl:
      'https://i.pinimg.com/736x/d7/06/ab/d706abac00c1d59c700a4c7d460478ee.jpg', // ภาพ Default
  };

  isEditing = false;
  tempProfile: any; // สำหรับเก็บข้อมูลชั่วคราวขณะแก้ไข

  // กำหนด URL ของ API Backend ของคุณ (ต้องตรงกับ Go Router)
  private API_URL = 'http://localhost:8080/api/v1/user/profile';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProfile();
  }

  // เมธอดสำหรับเรียกข้อมูลโปรไฟล์จาก Backend (GET)
  fetchProfile(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication error. Please log in again.');
      this.router.navigate(['/'], { replaceUrl: true });
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(this.API_URL, { headers }).subscribe({
      next: (data) => {
        // อัปเดตข้อมูลด้วยข้อมูลที่ได้จาก Go Backend
        this.userProfile = {
          username: data.username,
          email: data.email,
          password: '',
          // profileImageUrl ถูกตั้งชื่อให้ตรงกับ Go Model แล้ว
          profileImageUrl:
            data.profileImageUrl || this.userProfile.profileImageUrl,
        };
        this.tempProfile = { ...this.userProfile };
      },
      error: (err) => {
        console.error('Failed to fetch profile:', err);
        alert('Failed to load profile data.');
        this.tempProfile = { ...this.userProfile };
      },
    });
  }

  toggleEditMode(): void {
    if (this.isEditing) {
      // จากโหมดแก้ไข -> โหมดบันทึก
      this.saveProfile();
    } else {
      // จากโหมดแสดง -> โหมดแก้ไข (สร้างสำเนาข้อมูล)
      this.tempProfile = { ...this.userProfile };
      this.isEditing = true;
    }
  }

  // เมธอดสำหรับบันทึกข้อมูลโปรไฟล์ไปยัง Backend (PUT)
  saveProfile(): void {
    if (!this.tempProfile.username || !this.tempProfile.email) {
      alert('Please fill in all required fields.');
      return;
    }

    // เตรียมข้อมูลที่จะส่งไป Backend
    const updateData: any = {
      username: this.tempProfile.username,
      email: this.tempProfile.email,
      // ส่ง password ไปเฉพาะเมื่อมีการกรอกค่าใหม่เท่านั้น
      ...(this.tempProfile.password && { password: this.tempProfile.password }),
    };

    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put(this.API_URL, updateData, { headers }).subscribe({
      next: (response) => {
        // อัปเดต userProfile ด้วยข้อมูลใหม่ และล้าง password ใน model
        this.userProfile = { ...this.tempProfile, password: '' };
        this.isEditing = false; // ออกจากโหมดแก้ไข
        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
      },
      error: (err) => {
        console.error('Failed to save profile:', err);
        const errorMessage =
          err.error?.error ||
          err.error?.message ||
          'Failed to save profile data.';
        alert(errorMessage);
        // อยู่ในโหมดแก้ไขเพื่อให้ผู้ใช้แก้ไขต่อ
        this.isEditing = true;
      },
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
