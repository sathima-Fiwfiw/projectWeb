import { Component } from '@angular/core';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail {
  gameDetails = {
    title: 'Grand Theft Auto V',
    genre: 'Action', // <--- ตัวนี้แหละคือ "Action"
    releaseDate: '14/04/2015 10:00',
    saleEndDay: 'อันดับ 2',
    price: '469',
    imageUrl: 'assets/gtav-box-art.png',
  };
}
