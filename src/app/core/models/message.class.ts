export class Message {
    mId: string;
    userId: string;
    messageText: string;
    creationTime: Date;
    answers: any[];

    constructor(obj?: any) {
        this.mId = obj ? obj.mId : '';
        this.userId = obj ? obj.userId: '';
        this.messageText = obj ? obj.messageText: '';
        this.creationTime = obj ? obj.creationTime: '';
        this.answers = obj ? obj.answers: [];
    }

    toJSON() {
        return {
            mId: this.mId,
            userId: this.userId,
            messageText: this.messageText,
            creationTime: this.creationTime,
            answers: this.answers,
        };
    }
} 

