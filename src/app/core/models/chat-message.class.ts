export class ChatMessage {
    public userName: string;
    public userId: string;
    public message: string;
    public date: Date;
    public userImgUrl: string;


    constructor(obj?: any) {
        this.userName = obj ? obj.userName : '';
        this.userId = obj ? obj.userId : '';
        this.message = obj ? obj.message : '';
        this.date = obj ? obj.date : '';
        this.userImgUrl = obj ? obj.userImgUrl : '';
    }

    toJson() {
        return {
            userName: this.userName,
            userId: this.userId,
            message: this.message,
            date: this.date,
            userImgUrl: this.userImgUrl
        }
    }

}