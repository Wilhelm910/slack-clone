import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public createChannelDialog: boolean;
  public sidebar: boolean = false;


  ngOnInit(): void {

    

  }

  receiverSidebar(sidebar:boolean){
    this.sidebar = sidebar;
  }

  receiverChannelDialog(createChannelDialog:boolean){
    this.createChannelDialog = createChannelDialog;
  }

  receiverChannelDialogClose(createChannelDialog:boolean){
    this.createChannelDialog = createChannelDialog;
    console.log(this.createChannelDialog)
  }

}
