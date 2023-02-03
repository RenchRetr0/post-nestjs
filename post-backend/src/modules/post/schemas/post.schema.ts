import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ versionKey: false })
export class Post {
    @Prop({type: String, allowNull: false})
    title: string;

    @Prop({type: String, allowNull: false})
    description: string;

    @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
    userCreatePost: {
        type: ObjectId,
        ref: User
    }

    @Prop({type: Date, default: Date.now()})
    created_at: { type: Date };

    @Prop({type: Date, default: Date.now()})
    update_at: { type: Date };
}

export const PostSchema = SchemaFactory.createForClass(Post);