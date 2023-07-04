
export class Chat {

    public chatName: any[] = [];
    public userImgUrl: any[] = [];
    public messages: any[] = [];
    public userId: any[] = [];

    constructor(obj?: any) {
        this.chatName = obj ? obj.chatName : '';
        this.userImgUrl = obj ? obj.userImgUrl : [];
        this.messages = obj ? obj.messages : [];
        this.userId = obj ? obj.userId : [];
    }

    public toJson() {
        return {
            chatName: this.chatName,
            userImgUrl: this.userImgUrl,
            messages: this.messages,
            userId: this.userId,
        }
    }

}