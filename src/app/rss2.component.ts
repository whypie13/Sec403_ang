import { Component, OnInit } from '@angular/core';
import { RssFeedService } from './rss.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rss2',
  imports: [CommonModule],
  templateUrl: './rss2.component.html',
})
export class rss2Component implements OnInit {
  entries: any[] = [];
  error: string | null = null;

  constructor(private rssFeedService: RssFeedService) {}

  ngOnInit() {
    this.fetchFilteredRss2();
  }

  fetchFilteredRss2() {
    this.rssFeedService.getFilteredRss2().subscribe(
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
