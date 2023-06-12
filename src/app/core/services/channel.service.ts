import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Subject, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelService implements OnInit {
  channelCollectionRef = this.afs.collection('channels');

  messagesAsJson: any;
  channelId: string;

  constructor(
    public afs: AngularFirestore,
  ) {
 
  }

  ngOnInit(): void {
 
  }

  setMessagesAsJson(channelId) {
    let channelDocRef: AngularFirestoreDocument = this.channelCollectionRef.doc(channelId);
    console.log(channelDocRef);
  
  }
}
