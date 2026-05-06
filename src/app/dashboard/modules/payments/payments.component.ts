import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {
  displayedColumns = ['id', 'date', 'amount', 'method', 'status'];
  transactions = [
    { id: 'TXN-9021', date: '2024-05-01', amount: 12500, method: 'UPI', status: 'Completed' },
    { id: 'TXN-9022', date: '2024-05-03', amount: 8400, method: 'Credit Card', status: 'Completed' },
    { id: 'TXN-9023', date: '2024-05-05', amount: 32000, method: 'Bank Transfer', status: 'Pending' },
  ];
}
