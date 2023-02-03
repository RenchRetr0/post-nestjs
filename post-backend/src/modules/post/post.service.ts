import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IPost } from './intrerface/post.interface';
import { CreatePostDto } from './dto/CreatePost.dto';
import { JwtUserDto } from '../auth/dto/JwtUser.dto';

@Injectable()
export class PostService {
    constructor (@InjectModel('Post') private readonly postModel: Model<IPost>) {}

    async createPost(createPostDto: CreatePostDto, JwtUser: JwtUserDto): Promise <IPost> {
        const newPost = new this.postModel({
            title: createPostDto.title,
            description: createPostDto.description,
            userCreatePost: JwtUser.id
        });

        return newPost.save();
    }

    async getPosts(): Promise<IPost[]> {
        const posts = await this.postModel.find().populate('userCreatePost');

        if(!posts || !posts[0]) {
            throw new HttpException('Not Found', 404);
        }

        return posts;
    }
}
