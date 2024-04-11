import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from 'src/auth/services/auth/auth.service'
import { UserDataDto } from 'src/users/dto/UserData.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  register(@Body() userDataDto: UserDataDto) {
    this.authService.createUserAccount(userDataDto)
  }
}
