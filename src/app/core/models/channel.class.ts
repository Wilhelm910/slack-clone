export class Channel {
  // public cId: string;
  public name: string;
  // public users: string[] = [];
  public messages: string[] = [];
  public nextMessageId: number;


  constructor(obj?: any) {
    
    this.name = obj ? obj.name : '';
    this.messages = obj ? obj.messages : '';
    this.nextMessageId = 1;
  }


  public toJson() {
    return {
      //    cId: this.cId,
      name: this.name,
      //  users: this.users,
      messages: this.messages
    }
  }
}