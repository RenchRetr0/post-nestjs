import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { UserRole } from '../enums/user.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
    @Prop({type: String, unique: true, allowNull: false})
    login: string;

    @Prop({type: String, unique: true, allowNull: false})
    email: string;

    @Prop({type: String, default: UserRole.USER, allowNull: false})
    role: UserRole.USER;

    @Prop({type: String, allowNull: false})
    password: string;

    @Prop({type: Date, default: Date.now()})
    created_at: { type: Date };

    @Prop({type: Date, default: Date.now()})
    update_at: { type: Date };
}

export const UserSchema = SchemaFactory.createForClass(User);