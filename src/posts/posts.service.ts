import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  createPost(userId: number, data: Prisma.PostsCreateWithoutUserInput) {
    return this.prisma.posts.create({
      data: {
        ...data,
        user_id: userId,
      },
    })
  }
}
