import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/app/core/models/channel.class';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  public createChannelDialog: boolean = false;
  channel = new Channel();
  allChannels = [];


  constructor(private firestore: AngularFirestore) { }


  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges({idField: 'ID'})
      .subscribe((changes: any) => {
        this.allChannels = changes;
        console.log(this.allChannels);
      })
     

  }

  @Output() sender = new EventEmitter<boolean>();
  showDialog() {
    if (this.createChannelDialog == true) {
      this.createChannelDialog = false;
    } else {
      this.createChannelDialog = true;
    }
    this.sender.emit(this.createChannelDialog)
  }


  showChannel() {

  }


}
