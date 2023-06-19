import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Thread } from 'src/app/core/models/thread.class';
import { ChannelService } from 'src/app/core/services/channel.service';
import { Timestamp } from '@angular/fire/firestore';
import { ThreadService } from 'src/app/core/services/thread.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { user } from '@angular/fire/auth';
import { User } from 'src/app/core/models/user.class';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
  providers: [DatePipe],
})
export class ThreadComponent implements OnInit {
  @Input() thrdObj: Thread;
  onFocus: boolean;
  avatarImgPath: string;

  constructor(
    private channelService: ChannelService,
    public threadService: ThreadService,
    private datePipe: DatePipe,
    private firestore: AngularFirestore,
  ) {
  }

  ngOnInit(): void {
    this.firestore.collection('users')
      .doc(this.thrdObj.userId)
      .valueChanges()
      .subscribe((userData) => {
        let user = new User(userData)
        this.avatarImgPath = user.userImgUrl;
      })
  }

  deleteThread(threadId: string) {
    this.channelService.threadsCollection.doc(threadId).delete()
  }

  transformTimestamp(timestamp: Date | Timestamp) {
    const asDate = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    const formattedDate = this.datePipe.transform(asDate, 'yyyy-MM-dd | HH:mm') + ' Uhr';
    return formattedDate;
  }

  showDetails(threadObject) {    
    this.threadService.activeThread.next(threadObject);
  }
}
