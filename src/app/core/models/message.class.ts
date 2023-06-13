import { DatePipe } from "@angular/common";

export class Message {
    mId: string;
    userId: string;
    userName: string;
    messageText: string;
    creationTime: Date;
    answers: any[];


    constructor(obj?: any, private datePipe?: DatePipe) {
        this.mId = obj ? obj.mId : '';
        this.userId = obj ? obj.userId : '';
        this.userName = obj ? obj.userName : '';
        this.messageText = obj ? obj.messageText : '';
        this.creationTime = obj ? obj.creationTime : '';
        this.answers = obj ? obj.answers : [];
    }

    toJSON() {

        return {
            mId: this.mId,
            userId: this.userId,
            userName: this.userName,
            messageText: this.messageText,
            creationTime: this.creationTime,
            answers: this.answers,
        };
    }
}

