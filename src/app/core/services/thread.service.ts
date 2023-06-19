import { Injectable, OnInit } from '@angular/core';
import { Thread } from '../models/thread.class';
import { Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ThreadService implements OnInit {
  activeThread: Subject<Thread> = new Subject;


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
    const threadsDoc = threadsCollection.doc(threadObject.tId);
    
    threadsDoc.delete()

  }
}
