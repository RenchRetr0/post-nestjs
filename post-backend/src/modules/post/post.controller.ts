import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleGuard } from '../auth/rules-guard';

import { CreatePostDto } from './dto/CreatePost.dto';
import { IPost } from './intrerface/post.interface';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard, RoleGuard)
    @Roles('admin', 'members')
    @Post('create')
    async createPost(@Body() createPostDto: CreatePostDto, @Request() JwtUser): Promise<IPost> {
        return await this.postService.createPost(createPostDto, JwtUser.user);
    }

    @Get('posts')
    async getPosts(): Promise<IPost[]> {
        return await this.postService.getPosts();
    }
}
