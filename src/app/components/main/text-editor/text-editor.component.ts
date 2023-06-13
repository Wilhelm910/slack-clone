import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { arrayUnion } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Channel } from 'src/app/core/models/channel.class';
import { Message } from 'src/app/core/models/message.class';
import { ChannelService } from 'src/app/core/services/channel.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  userDataSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public channelService: ChannelService,
  ) {
  }


  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
    this.getChannelId();
    this.getChannelData();

  }

  channelId: string = '';
  channelData: Channel = new Channel;

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

  getChannelId() {
    this.route.params.subscribe(params => {
      this.channelId = params['id'];
      this.channelService.channelId.next(this.channelId);
    })
  }


  getChannelData() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((data: any) => {
        this.channelData = new Channel(data);
      })
  }

  maxLength(event) {
    if (event.editor.getLength() > 100) {
      event.editor.deleteText(10, event.editor.getLength())
    }
  }

  onSubmit() {
    this.createNewMessage();
    this.editorForm.reset();

  }

  createNewMessage() {
    let userId = JSON.parse(localStorage.getItem('user')).uid;
   
    let message = new Message(
      {
        mId: 'in progress',
        userId: userId,
        userName: 'USER NAME',
        messageText: this.editorForm.get('editor').value,
        creationTime: new Date(),
        answers: [],
      }
    )
    console.log(message.toJSON());
    this.subscribeUserName(message.userId);
    this.updateMessagesOfChannel(message.toJSON())

    return message;
  }

  updateMessagesOfChannel(message) {
    this.channelService.collectionRef.doc(this.channelId)
      .update({ messages: arrayUnion(message) })
  }

  subscribeUserName(userId: string) {
    this.firestore
      .collection('users')
      .doc(userId)
      .get()
      .subscribe((user) => {
        let userData = user.data()
        let userName = userData;
        console.log('userData from message', user.data());

      })

  }
}
