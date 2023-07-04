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
       
      })
      this.getUser()
  }

  getUser() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'ID' })
      .subscribe((changes: any) => {
        this.users = changes;
        this.updateChatData()
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
    /*  this.users.forEach(element => {
        this.userInfo.push(element.userImgUrl)
      }); */
  }
  // IDs vergleichen. und dann imgUrl updaten

  updateChatData() {
    this.allChats.forEach(element => {
      console.log(this.users.length)
      for (let i = 0; i < this.users.length; i++) {
        // console.log(element.userId)
        // console.log(this.users[i].uid)
        if (element.userId == this.users[i].uid) {
          element.userImgUrl = this.users[i].userImgUrl
          element.chatName = this.users[i].displayName
          this.updateFirebase(element.ID, this.users[i].displayName, this.users[i].userImgUrl)
        }
      }
    });
  }

  updateFirebase(ID, name, imgurl) {
    this.firestore
      .collection('chats')
      .doc(ID)
      .update({ chatName: name, userImgUrl: imgurl })
  }


}
