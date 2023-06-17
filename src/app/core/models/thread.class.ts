import { DatePipe } from "@angular/common";

export class Thread {
    channelId: string;
    tId: string;
    userId: string;
    userName: string;
    message: string;
    creationTime: Date;
    answers: any[];


    constructor(obj?: any, private datePipe?: DatePipe) {
        this.channelId = obj ? obj.channelId : '';
        this.tId = obj ? obj.tId : '';
        this.userId = obj ? obj.userId : '';
        this.userName = obj ? obj.userName : '';
        this.message = obj ? obj.message : '';
        this.creationTime = obj ? obj.creationTime : '';
        this.answers = obj ? obj.answers : [];
    }

    toJSON() {

        return {
            channelId: this.channelId,
            tId: this.tId,
            userId: this.userId,
            userName: this.userName,
            message: this.message,
            creationTime: this.creationTime,
            answers: this.answers,
        };
    }
}

