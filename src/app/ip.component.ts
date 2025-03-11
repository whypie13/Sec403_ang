import { Component, OnInit } from '@angular/core';
import { IpService } from './ip.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ip',
  imports: [CommonModule, FormsModule],
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.css'],
})
export class IpComponent implements OnInit {
  ipAddress: string = '';
  ipData: any = null;
  errorMessage: string = '';

  constructor(private apiService: IpService) {}

  ngOnInit(): void {}

  onLookup(): void {
    if (this.ipAddress) {
      this.apiService.getIpInfo(this.ipAddress).subscribe(
        (data) => {
          this.ipData = data;
          this.errorMessage = '';
        },
        (error) => {
          this.ipData = null;
          this.errorMessage = 'Failed to find IP information.';
        }
      );
    } else {
      this.errorMessage = 'Please enter an IP address.';
    }
  }
}

