import { Injectable, OnInit } from '@angular/core';
import { Thread } from '../models/thread.class';
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ThreadService implements OnInit {
  activeThread = new BehaviorSubject(new Thread)


  constructor(
    private firestore: AngularFirestore,
      
  ) {
   this.activeThread.subscribe((object) => {
    
   })
  }

  ngOnInit(): void {  

  }

  deleteThread(threadObject) {   
    const channelCollection = this.firestore.collection('channels');
    const channelDoc = channelCollection.doc(threadObject.channelId);
    const threadsCollection = channelDoc.collection('threads');
    const threadDoc = threadsCollection.doc(threadObject.tId);
    
    threadDoc.delete()

  }
}
