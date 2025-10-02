import { Component } from '@angular/core';
import { Header } from '../header/header';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
