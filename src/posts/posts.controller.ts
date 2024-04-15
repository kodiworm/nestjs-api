import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/CreatePost.dto'

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  savePost(@Body() { user_id, ...postData }: CreatePostDto) {
    return this.postsService.createPost(user_id, postData)
  }
}
