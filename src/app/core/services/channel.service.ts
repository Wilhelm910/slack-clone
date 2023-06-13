import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelService implements OnInit {
  collectionRef = this.afs.collection('channels');

  channelId: Subject<string> = new Subject;

  constructor(
    public afs: AngularFirestore,
  ) {

  }

  ngOnInit(): void {
 
  }

}
