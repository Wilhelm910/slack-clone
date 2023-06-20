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

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('chats')
      .valueChanges({ idField: 'ID' })
      .subscribe((changes: any) => {
        this.allChats = changes;
        this.getUserImgUrl()
      })
  }

  getUserImgUrl() {
    this.allChats.forEach(element => {
      this.userInfo.push(element.userInfo)
    });
    this.userInfo.forEach(element => {
      this.imgUrls.push(element[0].userImgUrl)
    });
  }


}
