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
  users = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('chats')
      .valueChanges({ idField: 'ID' })
      .subscribe((changes: any) => {
        this.allChats = changes;
        this.getUser()
      })
  }

  getUser() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'ID' })
      .subscribe((changes: any) => {
        
        this.users = changes;
        console.log(this.users)
       // this.updateChatData()
      })
  }

  getUserImgUrl() {
    /*
    this.allChats.forEach(element => {
      this.userInfo.push(element.userInfo)
    });
    this.userInfo.forEach(element => {
      this.imgUrls.push(element[0].userImgUrl)
    }); 
    */
    this.users.forEach(element => {
      this.userInfo.push(element.userImgUrl)
    });
    console.log(this.userInfo)
  }
// IDs vergleichen. und dann imgUrl updaten
  updateChatData() {
    this.allChats.forEach(element => {
      for (let i = 0; i < this.users.length; i++) {
        if (element.ID == this.users[i].userImgUrl) {
          element.userImgUrl = this.users[i].userImgUrl
        }
      }
    });
    console.log(this.allChats)
  }


}
