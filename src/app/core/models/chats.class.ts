
export class Chat {

    public name: any[] = [];
    public users: any[] = [];
    public messages: any[] = [];

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.users = obj ? obj.users : [];
        this.messages = obj ? obj.messages : [];
    }

    public toJson() {
        return {
            name: this.name,
            users: this.users,
            messages: this.messages
        }
    }

}