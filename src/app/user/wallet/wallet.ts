import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// --- การแก้ไข ---
// 1. Import Header Component เข้ามา
import { Header } from '../header/header';

@Component({
  selector: 'app-wallet',
  standalone: true,
  // 2. เพิ่ม Header ใน imports และเปลี่ยนไปใช้ templateUrl, styleUrl
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './wallet.html',
  styleUrl: './wallet.scss',
})
export class Wallet {
  // --- ส่วน Logic ทั้งหมด (เหมือนเดิม) ---
  currentBalance = 15000;
  predefinedAmounts = [100, 300, 500, 1000];
  selectedAmount: number | null = null;
  customAmount: number | null = null;

  transactionHistory = [
    { date: '2024-10-25', type: 'ซื้อเกม Cyberpunk', amount: -1899 },
    { date: '2024-10-24', type: 'เติมเงิน', amount: 2000 },
    { date: '2024-10-22', type: 'ซื้อเกม Valorant Pass', amount: -350 },
  ];

  selectAmount(amount: number): void {
    this.selectedAmount = amount;
    this.customAmount = null; // เคลียร์ช่อง input เมื่อเลือกปุ่ม
  }

  clearSelection(): void {
    this.selectedAmount = null; // เคลียร์ปุ่มเมื่อพิมพ์ใน input
  }

  isTopUpAmountValid(): boolean {
    const amount = this.selectedAmount ?? this.customAmount;
    return amount !== null && amount >= 100;
  }

  confirmTopUp(): void {
    if (!this.isTopUpAmountValid()) return;

    const amountToTopUp = this.selectedAmount ?? this.customAmount!;
    this.currentBalance += amountToTopUp;

    // เพิ่มประวัติการทำรายการ
    this.transactionHistory.unshift({
      date: new Date().toISOString().split('T')[0], // วันที่ปัจจุบัน
      type: 'เติมเงิน',
      amount: amountToTopUp,
    });

    // รีเซ็ตค่า
    this.selectedAmount = null;
    this.customAmount = null;
  }
}
