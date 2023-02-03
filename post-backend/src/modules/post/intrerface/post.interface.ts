export interface IPost {
    readonly _id: string;
    readonly title: string;
    readonly description: string;
    readonly created_at: Date;
    readonly update_at: Date;
}