
export interface IUser {
    readonly _id: string;
    readonly login: string;
    readonly email: string;
    readonly role: string;
    readonly password: string;
    readonly created_at: Date;
    readonly update_at: Date;
}