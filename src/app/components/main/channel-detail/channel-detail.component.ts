import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/app/core/models/channel.class';
import { Thread } from 'src/app/core/models/thread.class';
import { ChannelService } from 'src/app/core/services/channel.service';
import { SearchFilterService } from 'src/app/core/services/search-filter.service';
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
  fullViewUpdate: boolean = false;



  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private channelService: ChannelService,
    private threadService: ThreadService,
    public searchService: SearchFilterService,
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

  // includesSearchValue(thread) {
  //   const inputValue = this.searchService.searchValue;
  //   if (inputValue != null && (
  //     (JSON.stringify(thread.userName)).toLowerCase().includes(inputValue.toLowerCase().trim()) ||
  //     (JSON.stringify(thread.message)).toLowerCase().includes(inputValue.toLowerCase().trim()))
  //     )
  //   {
  //     return true 
  //   } else {
  //     return false
  //   }
  // }
}
