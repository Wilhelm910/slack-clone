import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/core/models/chats.class';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit {

  chatId: string = '';
  chatData: Chat = new Chat;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.chatId = params['id'];
      this.getChat();
    })
  }

  getChat() {
    this.firestore
    .collection('chats')
    .doc(this.chatId)
    .valueChanges()
    .subscribe((chatData:any) => {
      this.chatData = new Chat(chatData)
    })
}

}
