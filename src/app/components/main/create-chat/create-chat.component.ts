import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  selectUser(i:any) {
    this.selectedUsers.push(this.allUsers[i])
    console.log(this.selectedUsers)
  }

  removeUserFromSelection(uId:any) {
    this.selectedUsers.forEach(element => {
      if (uId == element.uid) {
        this.selectedUsers.splice(this.selectedUsers.indexOf(element), 1)
      }
    });
  }

  createChat() {
    if(this.selectedUsers.length > 0) {
      
    }
  }

}
