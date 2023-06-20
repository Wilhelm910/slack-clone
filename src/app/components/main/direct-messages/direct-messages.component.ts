import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chat } from 'src/app/core/models/chats.class';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss']
})
export class DirectMessagesComponent implements OnInit {

  chat = new Chat;
  allChats = [];
  imgUrls = [];
  userInfo = [];

  constructor(private firestore: AngularFirestore){}

  ngOnInit(): void {
    this.firestore
    .collection('chats')
    .valueChanges({idField: 'ID'})
    .subscribe((changes:any) => {
      this.allChats = changes;
      console.log(this.allChats)
      this.getUserImgUrl()
    })
  }

  getUserImgUrl() {
    this.allChats.forEach(element => {
      this.userInfo = element.userInfo
      console.log(this.userInfo)
    });
    this.imgUrls.push(this.userInfo[0].userImgUrl);
    console.log(this.imgUrls)
    
  }


}
