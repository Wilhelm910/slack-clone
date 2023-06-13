export class User {
    uid: string;
    firstName: string;
    lastName: string;
    initials: string;
    email: string;
    displayName: string;
    emailVerified: boolean;

    constructor(obj?: any) {
        this.uid = obj ? obj.uid : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.initials = obj ? obj.initials : '';
        this.email = obj ? obj.email : '';
        this.displayName = obj ? obj.displayName : '';
        this.emailVerified = obj ? obj.emailVerified : '';
    }
}