import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

// Interface สำหรับข้อมูลโปรโมชันแต่ละแถว
export interface Promotion {
  name: string;
  discount: number;
  period: string;
  quantity: number;
  used: number;
}

// ข้อมูลตัวอย่างตามรูปภาพที่ส่งมา
const PROMOTION_DATA: Promotion[] = [
  {
    name: '10.10', discount: 20, period: '25/05/2025', quantity: 50, used: 50,
    displayedColumns: [],
    dataSource: [],
    addPromotion: function (): void {
      throw new Error('Function not implemented.');
    }
  },
  {
    name: 'วันเกิดเจ้าของWed เลยลด', discount: 30, period: '30/05/2025 - 01/06/2025', quantity: 10, used: 5,
    displayedColumns: [],
    dataSource: [],
    addPromotion: function (): void {
      throw new Error('Function not implemented.');
    }
  },
  {
    name: 'อยากขาดทุนเลยลดให้', discount: 100, period: '05/06/2025 - 10/06/2025', quantity: 100, used: 99,
    displayedColumns: [],
    dataSource: [],
    addPromotion: function (): void {
      throw new Error('Function not implemented.');
    }
  },
  {
    name: 'ลดให้เฉยๆ', discount: 10, period: '14/06/2025 - 14/08/2025', quantity: 10, used: 6,
    displayedColumns: [],
    dataSource: [],
    addPromotion: function (): void {
      throw new Error('Function not implemented.');
    }
  },
];


@Component({
  selector: 'app-promotion',
  standalone: true,
  // เพิ่ม MatTableModule และ MatButtonModule ใน imports
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './promotion.html',
  styleUrl: './promotion.scss'
})
export class Promotion {
  // กำหนดคอลัมน์ที่จะแสดงในตาราง
  displayedColumns: string[] = ['name', 'discount', 'period', 'quantity', 'used'];
  // นำข้อมูลไปใส่ใน dataSource ของตาราง
  dataSource = PROMOTION_DATA;

  addPromotion(): void {
    // ฟังก์ชันสำหรับปุ่ม "เพิ่มโปรโมชัน" (ใส่ logic ที่นี่)
    console.log('Add Promotion button clicked!');
  }
}
