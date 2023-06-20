export class ChatMessage {
    public userName: string;
    public userId: string;
    public message: string;
    public date: Date;


    constructor(obj?: any) {
        this.userName = obj ? obj.userName : '';
        this.userId = obj ? obj.userId : '';
        this.message = obj ? obj.message : '';
        this.date = obj ? obj.date : '';
    }

    toJson() {
        return {
            userName: this.userName,
            userId: this.userId,
            message: this.message,
            date: this.date
        }
    }

}