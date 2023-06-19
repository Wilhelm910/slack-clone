import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/app/core/models/thread.class';
import { ThreadService } from 'src/app/core/services/thread.service';

@Component({
  selector: 'app-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.scss'],
})
export class ThreadDetailsComponent implements OnInit {
  thrdObj: Thread = new Thread;
  avatarImgPath: string;


  constructor(
    public threadService: ThreadService,

  ) {
    this.thrdObj = threadService.activeThread.getValue();
  }

  ngOnInit(): void {
    
    this.threadService.activeThread.subscribe((threadObject) => {      
      this.thrdObj = threadObject;
    })
  }
}

