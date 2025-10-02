import { Component } from '@angular/core';
import { Header } from '../header/header';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { C } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rpg',
  standalone: true,
  imports: [Header, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './rpg.html',
  styleUrl: './rpg.scss',
})
export class Rpg {
  games = [
    {
      name: 'Valorant',
      price: 1000,
      category: 'Action',
      description: 'เกมนี้สนุกมากๆ มาเล่นกันเยอะๆนะ',
      imageUrl:
        'https://t1.blockdit.com/photos/2020/05/5eac310dc03c6c0c9de8ff7d_800x0xcover_onP9ev5l.jpg',
    },
    {
      name: 'Genshin Impact',
      price: 1200,
      category: 'RPG',
      description: 'ผจญภัยในโลกกว้างสุดแฟนตาซี',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Genshin_Impact_promotional_art.jpg/220px-Genshin_Impact_promotional_art.jpg',
    },
    {
      name: 'Cyberpunk 2077',
      price: 1899,
      category: 'Action RPG',
      description: 'สัมผัสเมืองแห่งอนาคต Night City',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
    },
    {
      name: 'The Witcher 3',
      price: 1299,
      category: 'Action RPG',
      description: 'ออกล่านักล่าอสูรในตำนาน',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg',
    },
    {
      name: 'Elden Ring',
      price: 1790,
      category: 'Action RPG',
      description: 'ดินแดนต้องสาป รอคอยการมาถึงของท่าน',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_Art.jpg',
    },
    // เพิ่มเกมอื่นๆ ต่อที่นี่ได้เลย
  ];
}
