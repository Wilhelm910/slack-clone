export class Channel {
   // public cId: string;
    public name: string;
   // public users: string[] = [];
   // public messages: string[] = [];



    public toJson() {
        return {
        //    cId: this.cId,
            name: this.name,
          //  users: this.users,
          //  messages: this.messages
        }
    }
}