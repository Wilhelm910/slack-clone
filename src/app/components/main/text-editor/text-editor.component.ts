import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { arrayUnion } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    this.userId = JSON.parse(localStorage.getItem('user')).uid
  }


  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
    this.getChannelId();
    this.getChannelData();

  }

  userId: string;
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
    console.log('userID on submit:', this.userId);
    
    this.createNewMessage();
    console.log('was here');
    this.editorForm.reset();
    console.log('userID after reset', this.userId);
    
    
  }

  createNewMessage() {
    let message = new Message(
      {
        mId: 'in progress',
        userId: this.userId,
        messageText: this.editorForm.get('editor').value,
        creationTime: new Date(),
        answers: [],
      }
    )
    console.log(message.toJSON());
    
    this.updateMessagesOfChannel(message.toJSON())
    
    return message;
  }

  updateMessagesOfChannel(message) {
    this.channelService.collectionRef.doc(this.channelId).update({ messages: arrayUnion(message) })
  }
}
