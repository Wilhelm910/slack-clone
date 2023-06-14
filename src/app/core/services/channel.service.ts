import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelService implements OnInit {
  collectionRef: AngularFirestoreCollection = this.firestore.collection('channels');
  channelDoc: AngularFirestoreDocument;
  messagesCollection: AngularFirestoreCollection;

  channelId: Subject<string> = new Subject;
  messages: Subject<[]> = new Subject;

  constructor(
    public firestore: AngularFirestore,
    
  ) {
    this.channelId.subscribe((channelId) => {
      this.channelDoc = this.collectionRef.doc(channelId);
      this.messagesCollection = this.channelDoc.collection('messages')
    })
  }

  ngOnInit(): void {

  }

}
