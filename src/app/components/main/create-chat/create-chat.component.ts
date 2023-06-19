import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chat } from 'src/app/core/models/chats.class';
import { User } from 'src/app/core/models/user.class';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.scss']
})
export class CreateChatComponent implements OnInit {

  allUsers = [];
  allDisplayNames = [];
  selectedUsers = []
  chat = new Chat;
  allChats = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allUsers = changes;
        this.generateSearchArray();
      })
  }

  generateSearchArray() {
    this.allUsers.forEach(element => {
      this.allDisplayNames.push(element.displayName)
    });
    console.log(this.allDisplayNames)
  }


  selectUser(i: any) {
    if (!this.selectedUsers.includes(this.allUsers[i])) {
      this.selectedUsers.push(this.allUsers[i])
      console.log(this.selectedUsers)
    }
  }


  removeUserFromSelection(uId: any) {
    this.selectedUsers.forEach(element => {
      if (uId == element.uid) {
        this.selectedUsers.splice(this.selectedUsers.indexOf(element), 1)
      }
    });
  }


  createChat() {
    if (this.selectedUsers.length > 0) {
      this.selectedUsers.forEach(element => {
        this.chat.users.push(element.uid)
      });
      this.createChatName();
      this.addChatToFirestore();
      this.selectedUsers = [];
    }

  }

  addChatToFirestore() {
    this.firestore
      .collection('chats')
      .add(this.chat.toJson())
  }

  createChatName() {
    this.chat.name = this.selectedUsers[0].displayName
  }

}
