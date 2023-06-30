import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Thread } from 'src/app/core/models/thread.class';
import { ChannelService } from 'src/app/core/services/channel.service';
import { Timestamp } from '@angular/fire/firestore';
import { ThreadService } from 'src/app/core/services/thread.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/core/models/user.class';
import { remove } from '@angular/fire/database';
import { map } from 'rxjs';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
  providers: [DatePipe],
})
export class ThreadComponent implements OnInit {
  @Input() thrdObj: Thread;
  @Input() viewId: number;
  @Input() avatarImgPath: string;
  @Input() showAnswersAmount: boolean;
  @Output() removeIdFromView: EventEmitter<number> = new EventEmitter;
  public showThis: boolean = false;

  onFocus: boolean;
  userIsCreator: boolean = false;
  answersAmount: number = 0;
  answersText: string;
  confirmDelete: boolean = false;

  dayAsString: string;
  timeAsString: string;

  constructor(
    public threadService: ThreadService,
    private datePipe: DatePipe,
    private firestore: AngularFirestore,
  ) {
  }

  ngOnInit(): void {    
    if(!this.thrdObj.isReply) {
          this.getAnswersAmount()
    }
    
    this.transformTimestamp(this.thrdObj.creationTime)

    this.firestore.collection('users')
      .doc(this.thrdObj.userId)
      .get()
      .pipe(map((userSnapshot) => {
          return userSnapshot.data();
      }))
      .subscribe((userData) => {            
        let user = new User(userData)
        this.avatarImgPath = user.userImgUrl;

        if (this.thrdObj.userId == JSON.parse(localStorage.getItem('user')).uid) {
          this.userIsCreator = true;
        }
      })
  }

  transformTimestamp(timestamp: Date | Timestamp) {
    const asDate = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    this.dayAsString = this.datePipe.transform(asDate, 'yyyy-MM-dd');
    this.timeAsString = this.datePipe.transform(asDate, 'HH:mm') + ' Uhr';
  }

  showDetails(threadObject) {
    localStorage.setItem('activeThread', JSON.stringify(threadObject));
    this.threadService.activeThread.next(threadObject);
  }

  deleteThis() {
    this.removeIdFromView.emit(this.viewId);
    this.threadService.deleteThread(this.thrdObj)

  }

  getAnswersAmount() {
    this.threadService.getFirebaseDoc(this.thrdObj)
      .collection('answers')
      .get()
      .subscribe((answers) => {
        this.answersAmount = answers.size;
        switch (answers.size) {
          case 0: this.answersText = 'no answers'; break;
          case 1: this.answersText = `1 answer`; break;
          default: this.answersText = `${answers.size} answers`
        }
      })  
  }

  public lookout() {
    console.log('test lookout');
    
  }

}

