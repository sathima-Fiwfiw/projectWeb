import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

// สร้าง Interface สำหรับโครงสร้างข้อมูลแต่ละแถว
export interface Transaction {
  user: {
    name: string;
    avatar: string;
  };
  game: string;
  price: number;
  time: string;
}

// ข้อมูลตัวอย่างตามรูปภาพ
const TRANSACTION_DATA: Transaction[] = [
  {
    user: { name: 'สุดหล่อ', avatar: 'https://placehold.co/40x40/FFC107/FFFFFF?text=SL' },
    game: 'Rov',
    price: 1000,
    time: '25/05/2025 13:29 น.'
  },
  {
    user: { name: 'สุดสวย', avatar: 'https://placehold.co/40x40/E91E63/FFFFFF?text=SS' },
    game: 'Volorant',
    price: 800,
    time: '30/05/2025 18:56 น.'
  },
  {
    user: { name: 'สุดเท่', avatar: 'https://placehold.co/40x40/4CAF50/FFFFFF?text=ST' },
    game: 'GTA V',
    price: 2000,
    time: '05/06/2025 10:10 น.'
  },
  {
    user: { name: 'สุดน่ารัก', avatar: 'https://placehold.co/40x40/3F51B5/FFFFFF?text=SN' },
    game: 'PUBG',
    price: 1500,
    time: '14/06/2025 20:20 น.'
  },
];


@Component({
  selector: 'app-record',
  // เพิ่ม MatTableModule และ CommonModule ใน imports array
  imports: [CommonModule, MatTableModule],
  standalone: true, // ทำให้เป็น Standalone Component
  templateUrl: './record.html',
  styleUrl: './record.scss'
})
export class Record {
  // กำหนดคอลัมน์ที่จะแสดงผล
  displayedColumns: string[] = ['user', 'game', 'price', 'time'];
  // นำข้อมูลตัวอย่างไปใช้งาน
  dataSource = TRANSACTION_DATA;
}
