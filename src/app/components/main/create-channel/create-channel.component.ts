import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogModule } from 'primeng/dialog';
import { Channel } from 'src/app/core/models/channel.class';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent {

  channel = new Channel();
  allChannels = [];

  constructor(private firestore: AngularFirestore){}

  ngOnInit(): void {
    
  }

  createChannel() {
    this.newChannel()
  }

  newChannel() {
    this.firestore
      .collection('channels')
      .add(this.channel.toJson())
      .then((result: any) => {
        console.log(result)
      })
    

    this.channel = new Channel
    console.log(this.channel)
  }

}
