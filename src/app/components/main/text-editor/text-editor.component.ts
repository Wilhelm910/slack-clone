import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { update } from '@angular/fire/database';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/app/core/models/channel.class';
import { Message } from 'src/app/core/models/message.class';
import { AuthService } from 'src/app/core/services/auth.service';

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
    private authService: AuthService,
    ) { }


 ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
    this.getChannelId();
    this.getChannelData();
    this.userDataSubscription = this.authService.userData.subscribe((data) => {
      this.userId = data.uid;
      
    })
  }



  userId: string;
  channel = new Channel();
  channelId = '';
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
    })
  }


  getChannelData() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((data:any) => {
        this.channelData = new Channel(data);
        console.log(this.channelData)
      })
  }



  onSubmit() {

    this.createNewMessage()

    // let message = new Message {
        
    // }
  }

  maxLength(event) {
    if (event.editor.getLength() > 100) {
      event.editor.deleteText(10, event.editor.getLength())
    }
  }

  createNewMessage() {
    console.log('user iddd', this.userId);
    
    let message = new Message(
      {
        mId: '',
        userId: this.userId, 
        messageText: this.editorForm.get('editor').value,
        creationTime: new Date(),
        answers: [],
      }
    )
    console.log(message);
    this.updateMessagesOfChannel(message)
    return message;
  }

  updateMessagesOfChannel(message) {

  }

}
