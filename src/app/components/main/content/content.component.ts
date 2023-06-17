import { Component, Input, OnInit } from '@angular/core';
import { Thread } from 'src/app/core/models/thread.class';
import { ThreadService } from 'src/app/core/services/thread.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  showDetails: boolean = false;
  thrdObj: Thread = new Thread;
  
  constructor(
    private threadService: ThreadService
  ) {
  }

  ngOnInit(): void {
    this.threadService.activeThread.subscribe((value) => {
      this.showDetails = true;
      this.thrdObj = value;
    })
  }

  openDetails(value) {
    this.showDetails = true;
  }
}
