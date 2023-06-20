import { getLocaleCurrencyCode } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Thread } from 'src/app/core/models/thread.class';
import { User } from 'src/app/core/models/user.class';
import { ThreadService } from 'src/app/core/services/thread.service';

@Component({
  selector: 'app-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.scss'],
})
export class ThreadDetailsComponent implements OnInit {
  @Output() avatarImgPath: string;
  thrdObj: Thread = new Thread;
  textEditorContext: string = 'reply';
  answers: Array<any> = [];
  answersText: string;

  constructor(
    public threadService: ThreadService,
    private firestore: AngularFirestore,

  ) {
    this.thrdObj = threadService.activeThread.getValue();
  }

  ngOnInit(): void {
    this.threadService.activeThread.subscribe((threadObject) => {
      this.thrdObj = threadObject;
      this.getAnswers(threadObject)
      this.updateAvatar(threadObject.userId);
    })

  }

  getAnswers(threadObject) {
    this.threadService
      .getFirebaseDoc(threadObject)
      .collection('answers')
      .valueChanges()
      .subscribe((data) => {
        this.answers = data;
        switch (data.length) {
          case 0: this.answersText = 'no answers'; break;
          case 1: this.answersText = `1 answer`; break;
          default: this.answersText = `${data.length} answers`
        }
      })
  }


  updateAvatar(userId: string) {
    this.firestore.collection('users')
      .doc(userId)
      .get()
      .pipe(map((user) => {
        return user.data();
      }))
      .subscribe((userData: User) => {
        this.avatarImgPath = userData.userImgUrl
      })


  }
}

