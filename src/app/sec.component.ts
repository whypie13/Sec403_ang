import { Component, OnInit } from '@angular/core';
import { SecService } from './sec.service';
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
  secData: any = null;
  errorMessage: string = '';

  constructor(private apiService: SecService) {}

  ngOnInit(): void {}

  onLookup(): void {
    if (this.sec_filings) {
      this.apiService.getSecInfo(this.sec_filings).subscribe(
        (data) => {
          this.secData = data;
          this.errorMessage = '';
        },
        (error) => {
          this.secData = null;
          this.errorMessage = 'Failed to find 8-K information.';
        }
      );
    } else {
      this.errorMessage = 'Please enter a form type.';
    }
  }
}
