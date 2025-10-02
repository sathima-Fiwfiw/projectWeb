import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';

// โครงสร้างสำหรับประวัติการทำรายการ
interface Transaction {
  date: string; // เช่น '2025-09-30'
  type: string; // เช่น 'เติมเงิน'
  amount: number;
}

@Component({
  selector: 'app-wallet',
  standalone: true,
  // นำเข้าโมดูลที่จำเป็น: CommonModule สำหรับ @for, @if, Pipes และ FormsModule สำหรับ [(ngModel)]
  imports: [CommonModule, FormsModule, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wallet-container">
      <div class="wallet-content-wrapper">
        <!-- 1. ยอดเงินคงเหลือ -->
        <div class="section-block">
          <h2 class="section-title">ยอดเงินคงเหลือ</h2>
          <div class="balance-card">
            <div class="balance-display">
              <!-- ใช้ Unicode Icon แทน MatIcon เพื่อความเข้ากันได้ในสภาพแวดล้อมจำกัด -->
              <span class="wallet-icon">💳</span>
              <span class="current-balance-text">
                {{ currentBalance() | number }}
              </span>
            </div>
          </div>
        </div>

        <!-- 2. ส่วนเติมเงิน -->
        <h2 class="section-title">เติมเงิน</h2>
        <div class="topup-box">
          <!-- ปุ่มเลือกจำนวนเงินสำเร็จรูป -->
          <div class="predefined-amounts">
            @for (amount of predefinedAmounts; track amount) {
            <button
              (click)="selectAmount(amount)"
              class="amount-button"
              [class.selected]="selectedAmount() === amount"
            >
              {{ amount | number }} ฿
            </button>
            }
          </div>

          <!-- ช่องระบุจำนวนเงินเอง -->
          <div class="custom-amount-area">
            <p class="custom-amount-label">ระบุจำนวนเงิน</p>
            <input
              type="number"
              class="custom-input"
              placeholder="100"
              [ngModel]="customAmount()"
              (ngModelChange)="onCustomAmountChange($event)"
              min="100"
              autocomplete="off"
            />
          </div>

          <!-- ปุ่มเติมเงินหลัก -->
          <button
            (click)="confirmTopUp()"
            [disabled]="topUpAmount() < 100"
            class="topup-button"
            [class.disabled]="topUpAmount() < 100"
          >
            เติมเงิน ({{ topUpAmount() | number }} ฿)
          </button>
        </div>

        <!-- 3. ประวัติการทำรายการ -->
        <h2 class="section-title">ประวัติการทำรายการ</h2>
        <div class="history-box">
          @for (transaction of transactionHistory(); track transaction; let last
          = $last) {
          <div class="history-item" [class.no-border]="last">
            <span class="history-date">{{ transaction.date }}</span>
            <span class="history-type">{{ transaction.type }}</span>
            <span
              class="history-amount"
              [class.positive]="transaction.amount > 0"
            >
              <!-- แสดง + และใช้ Pipe ในการจัดรูปแบบตัวเลข -->
              {{ transaction.amount > 0 ? '+' : ''
              }}{{ transaction.amount | number }} ฿
            </span>
          </div>
          } @empty {
          <div class="no-history">ยังไม่มีประวัติการทำรายการ</div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* -------------------- Global Styles -------------------- */
      .wallet-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        background-color: #f7f7f7;
        min-height: 100vh;
        font-family: 'Inter', sans-serif;
      }
      .wallet-content-wrapper {
        width: 100%;
        max-width: 448px;
      }
      .section-block {
        margin-bottom: 2rem;
      }
      .section-title {
        font-size: 1.25rem;
        font-weight: bold;
        color: #dc2626; /* Red color */
        text-align: center;
        margin-bottom: 1rem;
      }

      /* -------------------- 1. Balance Section -------------------- */
      .balance-card {
        background-color: white;
        padding: 1rem;
        border-radius: 0.75rem;
        border: 1px solid #e5e7eb;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -4px rgba(0, 0, 0, 0.05); /* Soft Shadow */
      }
      .balance-display {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }
      .wallet-icon {
        font-size: 1.875rem;
        color: #dc2626;
      }
      .current-balance-text {
        font-size: 2.25rem;
        font-weight: 800;
        color: #1f2937;
      }

      /* -------------------- 2. Topup Section -------------------- */
      .topup-box {
        background-color: white;
        padding: 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* Stronger Shadow */
        margin-bottom: 2rem;
      }
      .predefined-amounts {
        display: flex;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
      }
      .amount-button {
        padding: 0.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        transition: all 0.15s ease-in-out;
        width: 6rem;
        border: 1px solid #d1d5db; /* Light gray border */
        background-color: #f3f4f6;
        color: #374151;
        cursor: pointer;
      }
      .amount-button:hover {
        background-color: #e5e7eb;
      }
      .amount-button.selected {
        background-color: #dc2626;
        color: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        border-color: #dc2626;
        transform: translateY(-2px);
      }

      .custom-amount-area {
        text-align: center;
        margin-bottom: 1rem;
      }
      .custom-amount-label {
        color: #4b5563;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
      .custom-input {
        width: 100%;
        padding: 0.5rem;
        border: 2px solid #d1d5db;
        border-radius: 0.5rem;
        text-align: left;
        font-size: 1rem;
        font-family: monospace;
        transition: border-color 0.15s;
      }
      .custom-input:focus {
        border-color: #ef4444;
        // outline: none;
      }

      .topup-button {
        width: 100%;
        padding: 0.75rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: bold;
        transition: all 0.15s ease-in-out;
        cursor: pointer;
        border: none;
      }
      .topup-button:not(.disabled) {
        background-color: #dc2626;
        color: white;
        box-shadow: 0 10px 15px -3px rgba(252, 165, 165, 0.5); /* Custom red shadow */
      }
      .topup-button:not(.disabled):hover {
        background-color: #b91c1c;
      }
      .topup-button.disabled {
        background-color: #d1d5db;
        color: #6b7280;
        cursor: not-allowed;
        box-shadow: none;
      }

      /* -------------------- 3. History Section -------------------- */
      .history-box {
        background-color: white;
        padding: 1rem;
        border-radius: 0.75rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -2px rgba(0, 0, 0, 0.05);
        border: 1px solid #f3f4f6;
      }
      .history-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 0.5rem;
        font-size: 1rem;
        border-bottom: 1px solid #f3f4f6;
      }
      .history-item.no-border {
        border-bottom: none;
      }
      .history-date {
        color: #6b7280;
        width: 30%;
      }
      .history-type {
        color: #374151;
        font-weight: 500;
        width: 30%;
      }
      .history-amount {
        font-weight: bold;
        text-align: right;
        width: 40%;
        color: #1f2937;
      }
      .history-amount.positive {
        color: #16a34a; /* Green for top-up */
      }
      .no-history {
        text-align: center;
        color: #6b7280;
        padding: 1rem;
      }

      /* Clean up spinner buttons for number input */
      .custom-input::-webkit-outer-spin-button,
      .custom-input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .custom-input {
        -moz-appearance: textfield; /* Firefox */
      }
    `,
  ],
})
export class Wallet {
  // 1. State Signals
  // ปรับค่าเริ่มต้นให้ตรงกับภาพพรีวิวล่าสุดของคุณ (10,100)
  currentBalance = signal<number>(10100);
  predefinedAmounts: number[] = [100, 200, 500];
  selectedAmount = signal<number | null>(null);
  // ปรับค่าเริ่มต้นเป็น 100 เพื่อให้ปุ่ม "เติมเงิน" ใช้งานได้ทันที
  customAmount = signal<number | null>(100);

  transactionHistory = signal<Transaction[]>([
    { date: '2025-09-30', type: 'เติมเงิน', amount: 100 },
    { date: '2025-09-28', type: 'เติมเงิน', amount: 200 },
    { date: '2025-09-28', type: 'เติมเงิน', amount: 1000 },
  ]);

  // 2. Computed Signal: กำหนดจำนวนเงินที่จะเติม
  topUpAmount = computed<number>(() => {
    const selected = this.selectedAmount();
    const custom = this.customAmount();

    if (selected !== null) {
      return selected;
    }
    if (custom !== null && custom > 0) {
      return Math.floor(custom);
    }
    return 0;
  });

  // 3. Methods

  selectAmount(amount: number): void {
    this.selectedAmount.set(amount);
    this.customAmount.set(null); // เคลียร์ช่อง input
  }

  // จัดการการเปลี่ยนแปลงของ input และเคลียร์ selection
  onCustomAmountChange(value: string): void {
    const amount = parseFloat(value);

    if (!isNaN(amount) && amount > 0) {
      this.customAmount.set(amount);
      this.selectedAmount.set(null); // เคลียร์การเลือกปุ่ม
    } else {
      this.customAmount.set(null);
    }
  }

  confirmTopUp(): void {
    const amountToTopUp = this.topUpAmount();

    if (amountToTopUp < 100) {
      console.error('การเติมเงินล้มเหลว: จำนวนเงินขั้นต่ำในการเติมคือ 100 ฿');
      return;
    }

    this.currentBalance.update((balance) => balance + amountToTopUp);

    const newTransaction: Transaction = {
      date: new Date().toISOString().substring(0, 10),
      type: 'เติมเงิน',
      amount: amountToTopUp,
    };

    this.transactionHistory.update((history) => [newTransaction, ...history]);

    this.selectedAmount.set(null);
    this.customAmount.set(null);

    console.log(
      `เติมเงินสำเร็จ: +${amountToTopUp} ฿. ยอดคงเหลือใหม่: ${this.currentBalance()}`
    );
  }
}
