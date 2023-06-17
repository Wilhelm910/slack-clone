import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChannelService } from 'src/app/core/services/channel.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.scss']
})
export class ThreadDetailsComponent implements OnInit {
  channelId: string = '';
  currentMessage: string = '';

  constructor(
    public firestore: AngularFirestore,
    private channelService: ChannelService
  ) {
    channelService.channelId.subscribe((value) => {
      this.channelId = value;
    })
  }

  ngOnInit(): void {
    
  }


}
