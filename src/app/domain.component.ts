import { Component, OnInit } from '@angular/core';
import { DomainService } from './domain.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'domain',
  imports: [CommonModule, FormsModule],
  templateUrl: './domain.component.html',
})
export class DomainComponent implements OnInit {
  domain: string = '';
  domainData: any = null;
  errorMessage: string = '';

  constructor(private apiService: DomainService) {}

  ngOnInit(): void {}

  onLookup(): void {
    if (this.domain) {
      this.apiService.getDomainInfo(this.domain).subscribe(
        (data) => {
          this.domainData = data;
          this.errorMessage = '';
        },
        (error) => {
          this.domainData = null;
          this.errorMessage = 'Failed to find domain information.';
        }
      );
    } else {
      this.errorMessage = 'Please enter a domain.';
    }
  }
}
