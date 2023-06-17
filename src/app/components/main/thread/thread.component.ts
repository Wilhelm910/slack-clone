import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Thread } from 'src/app/core/models/thread.class';
import { ChannelService } from 'src/app/core/services/channel.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
  providers: [DatePipe],
})
export class ThreadComponent {
  @Input() thrdObj: Thread;
  msgIsActive: boolean;

  constructor(
    private channelService: ChannelService,
    private datePipe: DatePipe,
  ) {

  }

  deleteThread(threadId: string) {
    this.channelService.threadsCollection.doc(threadId).delete()
  }
  
  transformTimestamp(timestamp: Date | Timestamp) {
    const asDate = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    const formattedDate = this.datePipe.transform(asDate, 'yyyy-MM-dd | HH:mm') + ' Uhr';
    return formattedDate;
  }

  openThread(threadId) {

  }
}
