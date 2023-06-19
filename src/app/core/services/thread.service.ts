import { Injectable, OnInit } from '@angular/core';
import { Thread } from '../models/thread.class';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreadService implements OnInit {
  activeThread: BehaviorSubject<Thread> = new BehaviorSubject(new Thread);

  constructor(
  ) {
   
  }

  ngOnInit(): void {    
  }

}
