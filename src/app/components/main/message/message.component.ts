import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Message } from 'src/app/core/models/message.class';
import { ChannelService } from 'src/app/core/services/channel.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  providers: [DatePipe],
})
export class MessageComponent {
  @Input() msgObj: Message;
  msgIsActive: boolean;

  constructor(
    private channelService: ChannelService,
    private datePipe: DatePipe,
  ) {

  }

  deleteMessage(messageId: string) {
    this.channelService.messagesCollection.doc(messageId).delete()
  }
  
  transformTimestamp(timestamp: Date | Timestamp) {
    const asDate = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    const formattedDate = this.datePipe.transform(asDate, 'yyyy-MM-dd | HH:mm') + ' Uhr';
    return formattedDate;
  }
}
