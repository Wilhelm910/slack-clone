import { Injectable, OnInit } from '@angular/core';
import { Thread } from '../models/thread.class';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreadService implements OnInit {
  activeThread: Subject<Thread> = new Subject;

  constructor(
  ) {

  }

  ngOnInit(): void {

  }
}
