// sec.component.ts
import { Component, OnInit } from '@angular/core';
import { SecService } from './sec.service';
import { SecFiling } from './sec-filing.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sec',
  imports: [CommonModule, FormsModule],
  templateUrl: './sec.component.html',
  styleUrls: ['./sec.component.css'],
})
export class SecComponent implements OnInit {
  sec_filings: string = '8-K';
  sec_ticker: string = 'AAPL';
  secData: SecFiling[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private apiService: SecService) {}

  ngOnInit(): void {}

  onLookup(): void {
    if (this.sec_filings && this.sec_ticker) {
      this.isLoading = true;

      this.apiService.getSecInfo(this.sec_ticker, this.sec_filings).subscribe(
        (data) => {
          console.log('Response Data:', data);

          if (Array.isArray(data)) {
            this.secData = data;
          } else if (data) {
            this.secData = [data];
          } else {
            this.secData = [];
            this.errorMessage = 'No data found.';
          }

          this.isLoading = false;
        },
      );
    } else {
      this.errorMessage = 'Please enter both a ticker and form type.';
    }
  }
}
