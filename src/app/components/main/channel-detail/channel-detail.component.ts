import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/app/core/models/channel.class';

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.scss'],
  providers: [DatePipe]
})
export class ChannelDetailComponent implements OnInit {
  channelId: string = '';
  channelData: Channel = new Channel;
  messages: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private datePipe: DatePipe,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.channelId = params['id'];
      this.getChannel();
    })
  }

  getChannel() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((data: any) => {
        this.channelData = new Channel(data);
        this.messages = this.channelData.messages;
      })
  }

  changeDateFormat(timestamp: Timestamp) {
    let asDate = timestamp.toDate()

    return this.datePipe.transform(asDate, 'yyyy-MM-dd | HH:mm U\'h\'r');
  };

}
