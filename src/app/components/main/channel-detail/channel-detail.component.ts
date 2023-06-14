import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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
  messagesCollection: AngularFirestoreCollection;
  messages: Array<any> = [];
  activeMessage: string;

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
      .subscribe((channelData: any) => {
        this.channelData = new Channel(channelData);
        this.setMessagesCollection(this.channelId)
        this.getMessages();


      })
  }

  setMessagesCollection(channelId) {
    this.messagesCollection = this.firestore
      .collection('channels')
      .doc(channelId)
      .collection('messages');
  }

  getMessages() {

    this.messagesCollection
      .valueChanges()
      .subscribe((messagesData: any) => {
        this.messages = messagesData;
        console.log('messages', this.messages);
      })
  }

  changeDateFormat(timestamp: Timestamp) {
    let asDate = timestamp.toDate()
    return this.datePipe.transform(asDate, 'yyyy-MM-dd | HH:mm') + ' Uhr';
  };

  mouseEnter() {
    console.log('mouse entered');

  }

  deleteMessage(messageId) {
    this.messagesCollection.doc(messageId).delete()
  }

}
