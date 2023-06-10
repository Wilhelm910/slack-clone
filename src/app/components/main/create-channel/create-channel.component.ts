import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogModule } from 'primeng/dialog';
import { Channel } from 'src/app/core/models/channel.class';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent {

  public createChannelDialog: boolean;
  channel = new Channel();
  allChannels = [];

  constructor(private firestore: AngularFirestore){}

  ngOnInit(): void {
    
  }

  createChannel() {
    this.newChannel()
    this.close()
  }

  newChannel() {
    this.firestore
      .collection('channels')
      .add(this.channel.toJson())
      .then((result: any) => {
      })
    this.channel = new Channel
  }

  @Output() sender = new EventEmitter<boolean>();

  close() {
    this.createChannelDialog = false;
    this.sender.emit(this.createChannelDialog)
  }

}
