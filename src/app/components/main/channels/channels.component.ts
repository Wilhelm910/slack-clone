import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/app/core/models/channel';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  channel: Channel;

  constructor(private firestore: AngularFirestore, public dialog: DialogModule){}

  ngOnInit(): void {
    
  }

  createChannel() {

  }

  newChannel() {
    this.channel = new Channel
  }


  showDialog() {
   // const dialogRef = this.dialog.open(CreateChannelComponent)
  }


}
