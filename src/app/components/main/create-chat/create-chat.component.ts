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

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((changes:any) => {
        this.allUsers = changes;
        console.log(this.allUsers)
      })
}

}
