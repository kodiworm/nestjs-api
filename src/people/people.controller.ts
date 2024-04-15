import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { PeopleService } from './people.service'
import { UserDataDto } from 'src/users/dto/UserData.dto'
import { UserSettingDto } from 'src/users/dto/UserSetting.dto'

@Controller('people')
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Post('save')
  @UsePipes(new ValidationPipe())
  createPerson(@Body() details: UserDataDto) {
    console.log(details)
    return this.peopleService.savePerson(details)
  }

  @Get()
  getPeople() {
    return this.peopleService.fetchPeople()
  }

  @Get(':id')
  async getPerson(@Param('id', ParseIntPipe) id: number) {
    const user = await this.peopleService.getPersonById(id)

    if (!user) throw new HttpException('Person Not Found', 404)

    return user
  }

  @Patch(':id')
  updatePerson(
    @Param('id', ParseIntPipe) id: number,
    @Body() details: UserDataDto,
  ) {
    return this.peopleService.updatePerson(id, details)
  }

  @Patch(':id/settings')
  updateUserSettingsByPersonId(
    @Param('id', ParseIntPipe) id: number,
    @Body() userSettingsData: UserSettingDto,
  ) {
    return this.peopleService.updateUserSettings(id, userSettingsData)
  }

  @Delete(':id')
  deletePerson(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.deletePerson(id)
  }
}
