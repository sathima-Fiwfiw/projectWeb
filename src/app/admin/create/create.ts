// create.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../../user/header/header';

// ... (Interface Game ยังคงเดิม) ...

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, Header],
  templateUrl: './create.html',
  styleUrls: ['./create.scss'],
})
export class Create implements OnInit {
  // URL รูปภาพเริ่มต้นสำหรับ placeholder
  private defaultBannerUrl = 'assets/default-game-banner.jpg';

  game: Game = {
    name: '',
    price: null,
    description: '',
    category: '',
    bannerUrl: this.defaultBannerUrl, // ใช้ URL แสดงผล
  };

  // Property สำหรับเก็บไฟล์จริงที่จะส่งไปยัง Server
  selectedFile: File | null = null;

  categories: string[] = ['Action', 'RPG', 'Strategy', 'Sports', 'Adventure'];

  constructor() {}
  ngOnInit(): void {}

  // **ฟังก์ชันใหม่: จัดการเมื่อมีการเลือกไฟล์**
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;

      // 1. สร้าง URL ชั่วคราวเพื่อแสดงตัวอย่างรูปภาพทันที
      const reader = new FileReader();
      reader.onload = () => {
        this.game.bannerUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // **ปรับปรุง onSubmit() เพื่อเตรียมส่งไฟล์**
  onSubmit(): void {
    if (
      this.game.name &&
      this.game.price &&
      this.game.description &&
      this.game.category
    ) {
      console.log('Game Data Submitted:', this.game);
      console.log('Selected File for upload:', this.selectedFile);

      // TODO: ในส่วนนี้ คุณจะต้องใช้ Angular HttpClient
      // เพื่อส่ง this.selectedFile (อาจจะผ่าน FormData) ไปยัง API

      alert('เพิ่มเกมใหม่สำเร็จ (Game Added Successfully)!');
      this.resetForm();
    } else {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน (Please fill in all required fields).');
    }
  }

  // **ปรับปรุง resetForm() เพื่อรีเซ็ตไฟล์ด้วย**
  resetForm(): void {
    this.game = {
      name: '',
      price: null,
      description: '',
      category: '',
      bannerUrl: this.defaultBannerUrl,
    };
    this.selectedFile = null;
  }

  onCancel(): void {
    if (
      confirm('ต้องการยกเลิกการเพิ่มเกมหรือไม่? ข้อมูลที่กรอกไว้จะไม่ถูกบันทึก')
    ) {
      this.resetForm();
      console.log('Form cancelled and reset.');
    }
  }
}

interface Game {
  name: string;
  price: number | null;
  description: string;
  category: string;
  bannerUrl: string; // ใช้สำหรับแสดงผล (Preview URL)
}
