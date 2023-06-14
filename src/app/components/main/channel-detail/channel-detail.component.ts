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
  messagesCollection: AngularFirestoreCollection;
  messages: Array<any> = [];

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
        console.log('this messages', this.messages);
        
        this.channelService.messages.next(messagesData);
      })
  }

    mouseEnter() {
    console.log('mouse entered');

  }

   openThread(messageId) {
    
  }

}
