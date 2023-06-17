import { DatePipe } from "@angular/common";

export class Thread {
    tId: string;
    userId: string;
    userName: string;
    message: string;
    creationTime: Date;
    answers: any[];


    constructor(obj?: any, private datePipe?: DatePipe) {
        this.tId = obj ? obj.tId : '';
        this.userId = obj ? obj.userId : '';
        this.userName = obj ? obj.userName : '';
        this.message = obj ? obj.message : '';
        this.creationTime = obj ? obj.creationTime : '';
        this.answers = obj ? obj.answers : [];
    }

    toJSON() {

        return {
            mId: this.tId,
            userId: this.userId,
            userName: this.userName,
            message: this.message,
            creationTime: this.creationTime,
            answers: this.answers,
        };
    }
}

