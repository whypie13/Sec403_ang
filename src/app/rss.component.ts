import { Component, OnInit } from '@angular/core';
import { RssFeedService } from './rss.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rss',
  imports: [CommonModule],
  templateUrl: './rss.component.html',
})
export class rssComponent implements OnInit {
  entries: any[] = [];
  error: string | null = null;

  constructor(private rssFeedService: RssFeedService) {}

  ngOnInit() {
    this.fetchFilteredRss();
  }

  fetchFilteredRss() {
    this.rssFeedService.getFilteredRss().subscribe(
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

