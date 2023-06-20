import { Injectable, OnInit } from '@angular/core';
import { Thread } from '../models/thread.class';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ThreadService implements OnInit {
  activeThread = new BehaviorSubject(new Thread);

  constructor(
    private firestore: AngularFirestore,
      
  ) {
   this.activeThread.subscribe((threadObject) => {
   })
  }
  
  ngOnInit(): void {  
  }

  deleteThread(threadObject) {   
    this.getFirebaseDoc(threadObject).delete()
  }


  getFirebaseDoc(object: any) {
    const channelCollection = this.firestore.collection('channels');
    const channelDoc = channelCollection.doc(object.channelId);
    const threadsCollection = channelDoc.collection('threads');
    const threadDoc = threadsCollection.doc(object.tId);

    return threadDoc
  }
}
