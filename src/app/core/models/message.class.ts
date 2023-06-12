export class Message {
    mId: string;
    userId: string;
    messageText: string;
    creationTime: Date;
    answers: any[];

    constructor(obj?: any) {
        this.mId = obj.mId;
        this.userId = obj.userId;
        this.messageText = obj.messageText;
        this.creationTime = obj.creationTime;
        this.answers = obj.answers;
    }

} 

