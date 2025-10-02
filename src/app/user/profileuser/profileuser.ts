import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';

@Component({
  selector: 'app-profileuser',
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './profileuser.html',
  styleUrl: './profileuser.scss',
})
export class Profileuser {
  // Model สำหรับเก็บข้อมูลผู้ใช้
  userProfile = {
    firstName: 'tsett',
    lastName: 'tttt',
    username: 'test1',
    email: 'tester@gmail.com',
    phone: '0999999999',
    // สมมติว่ามี URL รูปภาพ
    profileImageUrl:
      'https://i.pinimg.com/736x/d7/06/ab/d706abac00c1d59c700a4c7d460478ee.jpg', // แทนที่ด้วย path รูปภาพจริง
  };

  // ตัวแปรสำหรับจัดการสถานะการแก้ไข
  isEditing: boolean = false;

  // ตัวแปรสำหรับเก็บข้อมูลที่ยังไม่ได้บันทึก หากมีการแก้ไข
  tempProfile: any;

  constructor() {}

  ngOnInit(): void {
    // คัดลอกข้อมูลปัจจุบันไปที่ tempProfile เพื่อใช้ในการแก้ไขครั้งแรก
    this.tempProfile = { ...this.userProfile };
  }

  toggleEditMode(): void {
    if (this.isEditing) {
      // ถ้ากำลังแก้ไข -> ให้ยกเลิกการแก้ไข (ทิ้ง tempProfile)
      // หรือเรียกฟังก์ชัน save() ถ้าต้องการให้ปุ่ม "แก้ไข" เป็นปุ่ม "บันทึก"
      // ในตัวอย่างนี้ ปุ่ม "แก้ไข" จะเปลี่ยนเป็นปุ่ม "บันทึก"
      this.saveProfile();
    } else {
      // ถ้าไม่ได้แก้ไข -> เริ่มต้นโหมดแก้ไข
      // คัดลอกข้อมูลปัจจุบันไปที่ tempProfile เพื่อให้แก้ไขได้โดยไม่กระทบ userProfile ทันที
      this.tempProfile = { ...this.userProfile };
    }
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    // Logic การบันทึก:
    // 1. ส่ง tempProfile ไปยัง Service เพื่อบันทึกข้อมูล
    // 2. ถ้าสำเร็จ, อัปเดต userProfile ด้วย tempProfile
    this.userProfile = { ...this.tempProfile };
    alert('บันทึกข้อมูลเรียบร้อยแล้ว');
  }

  logout(): void {
    // Logic การออกจากระบบ
    alert('ออกจากระบบแล้ว');
    // ในแอปจริง: นำทางไปยังหน้า Login
  }
}
