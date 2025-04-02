import { Component, OnInit } from '@angular/core';
import { RssFeedService } from './rss.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rss3',
  imports: [CommonModule],
  templateUrl: './rss3.component.html',
})
export class rss3Component implements OnInit {
  entries: any[] = [];
  error: string | null = null;

  constructor(private rssFeedService: RssFeedService) {}

  ngOnInit() {
    this.fetchFilteredRss3();
  }

  fetchFilteredRss3() {
    this.rssFeedService.getFilteredRss3().subscribe(
      (data) => {
        this.entries = data;
        this.error = null;
      },
      (err) => {
        this.error = 'Failed to load RSS feed data';
        console.error(err);
      }
    );

  }
}
