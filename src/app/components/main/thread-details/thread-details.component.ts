import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Thread } from 'src/app/core/models/thread.class';
import { ChannelService } from 'src/app/core/services/channel.service';
import { ThreadService } from 'src/app/core/services/thread.service';

@Component({
  selector: 'app-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.scss']
})
export class ThreadDetailsComponent implements OnInit {
  channelId: string = '';
  currentMessage: string = '';
  threadId: string;
  thrdObj: Thread;

  constructor(
    public firestore: AngularFirestore,
    private channelService: ChannelService,
    private threadService: ThreadService,
  ) {
    this.channelService.channelId.subscribe((value) => {
      this.channelId = value;
    })

  }

  ngOnInit(): void {
    
  }


}
