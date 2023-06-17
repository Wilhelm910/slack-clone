import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelService implements OnInit {
  collectionRef: AngularFirestoreCollection = this.firestore.collection('channels');
  channelDoc: AngularFirestoreDocument;
  threadsCollection: AngularFirestoreCollection;

  channelId: Subject<string> = new Subject;
  threads: Subject<[]> = new Subject;

  constructor(
    public firestore: AngularFirestore,
    
  ) {
    this.channelId.subscribe((channelId) => {
      this.channelDoc = this.collectionRef.doc(channelId);
      this.threadsCollection = this.channelDoc.collection('threads')
    })
  }

  ngOnInit(): void {

  }

}
