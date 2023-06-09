import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/app/core/models/channel';
import { CreateChannelComponent } from '../create-channel/create-channel.component';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  channel: Channel;
  public createChannelDialog: boolean = false;

  constructor(private firestore: AngularFirestore){}

  ngOnInit(): void {
    
  }

  createChannel() {

  }

  newChannel() {
    this.channel = new Channel
  }


 
  

  @Output() sender = new EventEmitter<boolean>();

  showDialog() {
    if (this.createChannelDialog == true) {
      this.createChannelDialog = false;
    } else {
      this.createChannelDialog = true;
    }
    this.sender.emit(this.createChannelDialog)
    console.log(this.createChannelDialog)
  }


}
