import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/app/core/models/channel.class';
import { Thread } from 'src/app/core/models/thread.class';
import { ChannelService } from 'src/app/core/services/channel.service';
import { ThreadService } from 'src/app/core/services/thread.service';

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.scss'],
  providers: [DatePipe]
})
export class ChannelDetailComponent implements OnInit {
  channelId: string = '';
  channelData: Channel = new Channel;
  newThread: Thread = null;
  threadsCollection: AngularFirestoreCollection;
  threads: Array<any> = [];
  fullViewUpdate: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private channelService: ChannelService,
    private threadService: ThreadService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {      
      this.channelId = params['id'];
      this.getChannel();
      this.channelService.channelId.next(this.channelId);
    })

    this.threadService.newThread.subscribe((threadObject) => {
      if (threadObject != null) {
        this.newThread = threadObject;
      }
    })
  }

  getChannel() {

    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channelData: any) => {
        
       this.channelData = new Channel(channelData);
        this.setThreadsCollection(this.channelId);
        this.fullViewUpdate = true;
        this.getThreads();
      })
  }

  setThreadsCollection(channelId) {
    
    this.threadsCollection = this.firestore
      .collection('channels')
      .doc(channelId)
      .collection('threads');
  }

  getThreads() {
    this.threadsCollection
      .valueChanges()
      .subscribe((threadsData: any) => {        
        // this.sortThreadsData(threadsData);
        if (this.threads.length == 0 || this.fullViewUpdate) { this.threads = threadsData, this.fullViewUpdate = false };
        if (this.newThread !== null) { this.threads.push(this.newThread), this.newThread = null}
        this.ngOnInit
      })
  }

  sortThreadsData(data: any) {
    let sortedThreads = data.sort((a, b) => {
      if (a.creationTime < b.creationTime) {
        return -1;
      }
      if (a.creationTime > b.creationTime) {
        return 1;
      }
      return 0;

    });

    return sortedThreads;
  }

  removeIdFromView(i) {
    console.log(i);
    
    this.threads.splice(i, 1)
  }
}
