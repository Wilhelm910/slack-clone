export class Channel {
  // public cId: string;
  public name: string;
  // public users: string[] = [];


  constructor(obj?: any) {
    
    this.name = obj ? obj.name : '';
  }


  public toJson() {
    return {
      //    cId: this.cId,
      name: this.name,
      //  users: this.users,
    }
  }
}