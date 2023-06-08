import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public sidebar: boolean = false;

  ngOnInit(): void {

 

  }

  receiver(sidebar: boolean) {
    this.sidebar = sidebar
  }

}
