import { Component, OnInit } from '@angular/core';
import { ThreadService } from 'src/app/core/services/thread.service';

@Component({
  selector: 'app-thread-overview',
  templateUrl: './thread-overview.component.html',
  styleUrls: ['./thread-overview.component.scss']
})
export class ThreadOverviewComponent implements OnInit {
    showThreadList: boolean = true;

    constructor(
      public ThreadService: ThreadService
    ) {
    }

    ngOnInit(): void {
      this.ThreadService.userHasThreads.subscribe((value) => {
        this.showThreadList = value;
      })
    }
}
