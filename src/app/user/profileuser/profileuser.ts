import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';          // ✅ เพิ่ม
import { Header } from '../header/header';

@Component({
  selector: 'app-profileuser',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './profileuser.html',
  styleUrls: ['./profileuser.scss'],               // ✅ แก้เป็น styleUrls (array)
})
export class Profileuser implements OnInit {       // ✅ implements OnInit
  // Model สำหรับเก็บข้อมูลผู้ใช้
  userProfile = {
    username: 'test1',
    email: 'tester@gmail.com',
    password: '0999999999',
    profileImageUrl:
      'https://i.pinimg.com/736x/d7/06/ab/d706abac00c1d59c700a4c7d460478ee.jpg',
  };

  isEditing = false;
  tempProfile: any;

  constructor(private router: Router) {}           // ✅ ฉีด Router มาใช้

  ngOnInit(): void {
    this.tempProfile = { ...this.userProfile };
  }

  toggleEditMode(): void {
    if (this.isEditing) {
      this.saveProfile();
    } else {
      this.tempProfile = { ...this.userProfile };
    }
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    this.userProfile = { ...this.tempProfile };
    alert('บันทึกข้อมูลเรียบร้อยแล้ว');
  }

  logout(): void {
    // ✅ ล้างข้อมูลยืนยันตัวตนที่เก็บไว้ (ถ้ามี)
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // ✅ ไปหน้า login และแทนที่ประวัติ เพื่อกันกด Back กลับมา
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
