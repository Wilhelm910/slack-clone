import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  
  public channels:boolean = false;
  public messages:boolean = false;
  public createChannelDialog: boolean;


  toggleChannels() {
    if (this.channels == true) {
      this.channels = false;
    } else {
      this.channels = true;
    }
  }


  toggleMessages() {
    if (this.messages == true) {
      this.messages = false;
    } else {
      this.messages = true;
    }
  }


  receiverChannelDialog(createChannelDialog:boolean){
    this.createChannelDialog = createChannelDialog;
    this.showDialog(createChannelDialog)
  }

  
  @Output() sender = new EventEmitter<boolean>();

  showDialog(createChannelDialog:boolean) {
    this.sender.emit(this.createChannelDialog)
    console.log(this.createChannelDialog)
  }

}
