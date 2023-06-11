import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/app/core/models/channel.class';
import { CreateChannelComponent } from '../create-channel/create-channel.component';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  channel = new Channel();
  allChannels = [];


  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
  
    ) {

    }


  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges({idField: 'ID'})
      .subscribe((changes: any) => {
        this.allChannels = changes;
        console.log(this.allChannels);
      })
     

  }


  openDialog() {
    this.dialog.open(CreateChannelComponent);
  }


}
