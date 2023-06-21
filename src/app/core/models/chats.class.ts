
export class Chat {

    public name: any[] = [];
    public userImgUrl: any[] = [];
    public messages: any[] = [];
    public userInfo: any[] = [];

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.userImgUrl = obj ? obj.userImgUrl : [];
        this.messages = obj ? obj.messages : [];
        this.userInfo = obj ? obj.userInfo : [];
    }

    public toJson() {
        return {
            name: this.name,
            userImgUrl: this.userImgUrl,
            messages: this.messages,
            userInfo: this.userInfo,
        }
    }

}