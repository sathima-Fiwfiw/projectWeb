import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string; // URL หรือ path ไปยังรูปภาพ
}

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule], // Assuming standalone: true or module imports are handled elsewhere if needed
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  // Implement OnInit for initialization

  // Data to display
  cartItems: CartItem[] = [];
  discountCode: string = '';

  // Calculated values (matching the screenshot's state)
  subtotal: number = 0;
  discountAmount: number = 0; // 96.8 in the screenshot
  total: number = 0; // 871.2 in the screenshot

  constructor() {}

  ngOnInit(): void {
    // 1. Initial Data Load (based on the image)
    this.cartItems = [
      {
        id: 1,
        name: 'Grand Theft Auto V',
        price: 469,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png',
      },
      {
        id: 2,
        name: 'Jurassic World Evolution 2',
        price: 499,
        imageUrl:
          'https://m.media-amazon.com/images/M/MV5BODkxMGM4NjYtNDI2Ny00ODNkLWI3NGQtMWQwNDBhYTk4Y2ZlXkEyXkFqcGc@._V1_.jpg',
      },
    ];

    // 2. Initial Calculation
    this.calculateTotals();

    // Set initial values to match the screenshot for demonstration
    this.discountAmount = 96.8;
    this.total = this.subtotal - this.discountAmount;
  }

  calculateTotals(): void {
    // Calculate the sum of all item prices
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price, 0);

    // Recalculate total based on current subtotal and discountAmount
    this.total = this.subtotal - this.discountAmount;
  }

  applyDiscount(): void {
    // **Logic for applying the discount code**
    // This is a simplified example. In a real app, you'd call an API.
    const code = this.discountCode.toLowerCase();

    if (code === 'disc10' || code === 'ส่วนลด10') {
      this.discountAmount = this.subtotal * 0.1; // Apply 10% discount
    } else if (code === 'freegame') {
      this.discountAmount = 50; // Apply fixed discount
    } else {
      this.discountAmount = 0; // Invalid code
    }

    this.calculateTotals();
  }

  removeItem(itemId: number): void {
    // Remove the item from the array
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);

    // Recalculate totals after removal
    this.calculateTotals();

    // Re-apply discount logic to see if subtotal change affects the discount amount
    this.applyDiscount();
  }

  checkout(): void {
    alert(`กำลังดำเนินการชำระเงินรวม ฿${this.total.toFixed(2)}`);
    // Implement actual checkout logic here
  }
}
