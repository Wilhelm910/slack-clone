import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/app/core/models/channel.class';

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.scss']
})
export class ChannelDetailComponent implements OnInit {

  channelId = '';
  channelData: Channel = new Channel;

  constructor(private route:ActivatedRoute, private firestore: AngularFirestore){}

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.channelId = params['id'];
      console.log(this.channelId)
      this.getChannel();
    })
  }


  getChannel() {
    this.firestore
    .collection('channels')
    .doc(this.channelId)
    .valueChanges()
    .subscribe((data:any) => {
      this.channelData = new Channel(data);
      console.log(this.channelData)
    })
  }

}
