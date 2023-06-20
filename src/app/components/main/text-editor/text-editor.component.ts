import { Component, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/app/core/models/channel.class';
import { Thread } from 'src/app/core/models/thread.class';

import { ChannelService } from 'src/app/core/services/channel.service';
import { ThreadService } from 'src/app/core/services/thread.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  userDataSubscription: any;
  @Input() usageContext: string;
  thrdObj: Thread;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public channelService: ChannelService,
    private threadService: ThreadService,
  ) {}

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
    this.getChannelId();
    this.getChannelData();
    this.threadService.activeThread.subscribe((threadObject) => {
      if(this.usageContext == 'reply') {
        this.thrdObj = threadObject;
      }
    })
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
    if(this.usageContext == 'reply') {
      this.createNewReply();
    } else {
      this.createNewThread()
    }

    this.editorForm.reset();

  }

  createNewThread() {
    let user = JSON.parse(localStorage.getItem('user'));
   
    let thread = new Thread(
      {
        channelId: this.channelId,
        tId: '',
        userId: user.uid,
        userName: user.displayName,
        message: this.editorForm.get('editor').value,
        creationTime: new Date(),
        isReply: false
      }
    )
  
    this.updateThreadsOfChannel(thread.toJSON())

    return thread;
  }

  updateThreadsOfChannel(thread: any) {
    this.channelService.collectionRef.doc(this.channelId)
      .collection('threads').add(thread)
      .then((docRef) => {
        docRef.update({ tId: docRef.id })
      })
  }

  createNewReply() {
    let user = JSON.parse(localStorage.getItem('user'));
   
    let reply = new Thread(
      {
        channelId: this.thrdObj.tId,
        tId: '',
        userId: user.uid,
        userName: user.displayName,
        message: this.editorForm.get('editor').value,
        creationTime: new Date(),
        isReply: true
      }
    )
  
    this.updateRepliesOfThread(reply.toJSON())

    return reply;
  }

  updateRepliesOfThread(reply: any) {

    console.log('reply obj', reply);
      this.channelService.collectionRef.doc(this.thrdObj.channelId)
      .collection('threads')
      .doc(reply.channelId)
      .collection('answers')
      .add(reply)
      .then((docRef) => {
        docRef.update({ tId: docRef.id })
      })
  }
}
