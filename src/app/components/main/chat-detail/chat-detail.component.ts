import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from 'src/app/core/models/chat-message.class';
import { Chat } from 'src/app/core/models/chats.class';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit {

  chatId: string = '';
  chatData: Chat = new Chat;
  userNames = [];

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
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
      .subscribe((chatData: any) => {
        this.chatData = new Chat(chatData)
        console.log(this.chatData)
        this.getUserNames();
      })
  }

  getUserNames() {
    this.userNames = [];
    this.chatData.userInfo.forEach(element => {
      this.userNames.push(element.displayName)
    });
    console.log(this.userNames)
  }


  editorContent: string;
  editorForm: FormGroup;
  editorStyle = {
    height: '200px',
  }

  config = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['emoji'],
      ['link']
    ]
  }

  onSubmit() {
    let user = JSON.parse(localStorage.getItem('user'));
    let reply = new ChatMessage({
      userName: user.displayName,
      userId: user.uid,
      message: this.editorForm.get('editor').value,
      date: new Date
    })
    this.updateChatMessages(reply.toJson())
  }


  updateChatMessages(reply: any) {
    this.firestore
      .collection('chats')
      .doc(this.chatId)
      .collection('messages')
      .add(reply)
  }

  maxLength(event) {
    if (event.editor.getLength() > 1000) {
      event.editor.deleteText(1000, event.editor.getLength())
    }
  }


}
