import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/app/core/models/channel.class';
import { ChannelService } from 'src/app/core/services/channel.service';

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.scss'],
  providers: [DatePipe]
})
export class ChannelDetailComponent implements OnInit {
  channelId: string = '';
  channelData: Channel = new Channel;
  threadsCollection: AngularFirestoreCollection;
  threads: Array<any> = [];
  showAnswerAmount: boolean;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private channelService: ChannelService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.channelId = params['id'];
      this.getChannel();
      this.channelService.channelId.next(this.channelId);
    })
  }

  getChannel() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channelData: any) => {
        this.channelData = new Channel(channelData);
        this.setThreadsCollection(this.channelId)
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
        this.sortThreadsData(threadsData)
        this.threads = threadsData;
        this.channelService.threads.next(threadsData);
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
}
