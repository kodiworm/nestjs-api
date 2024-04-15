import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  user_id: number
}
