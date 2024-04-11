import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Query } from '@nestjs/common'
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto'
import { UsersService } from 'src/users/services/users/users.service'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.fetchUsers()
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id)
  }

  @Get('data/query')
  getQueryParam(@Query('sortBy') sortBy: string) {
    console.log(sortBy)
    return { sortBy }
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDetails: UpdateUserDto
  ) {
    await this.userService.updateUser(id, userDetails)
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id)
  }
}
