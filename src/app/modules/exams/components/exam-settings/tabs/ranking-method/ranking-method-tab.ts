import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-ranking-method-tab',
  standalone: true,
  imports: [CommonModule, MatRadioModule],
  templateUrl: './ranking-method-tab.html',
  styleUrl: './ranking-method-tab.scss'
})
export class RankingMethodTabComponent {
}
