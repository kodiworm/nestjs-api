import { HttpException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class PeopleService {
  constructor(private prisma: PrismaService) {}

  savePerson(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...data,
        userSetting: {
          create: {
            notifications_on: false,
            sms_enabled: false,
          },
        },
      },
    })
  }

  fetchPeople() {
    return this.prisma.user.findMany({
      include: {
        userSetting: true,
        posts: true,
      },
    })
  }

  getPersonById(personId: number) {
    return this.prisma.user.findUnique({
      where: { id: personId },
      include: {
        userSetting: {
          select: {
            notifications_on: true,
            sms_enabled: true,
          },
        },
        posts: true,
      },
    })
  }

  async updatePerson(personId: number, data: Prisma.UserUpdateInput) {
    const person = await this.prisma.user.findUnique({
      where: { id: personId },
    })

    if (!person) throw new HttpException('Person Data not found!', 404)

    const personUser = await this.prisma.user.findUnique({
      where: { username: data.username.toString() },
    })

    if (personUser) throw new HttpException('Username already taken', 400)

    return this.prisma.user.update({ where: { id: personId }, data })
  }

  async updateUserSettings(
    personId: number,
    data: Prisma.UserSettingUpdateInput,
  ) {
    const person = await this.getPersonById(personId)

    if (!person) throw new HttpException('Person Not Found', 404)
    if (!person.userSetting) throw new HttpException('No Settings', 400)

    return await this.prisma.userSetting.update({
      where: {
        user_id: personId,
      },
      data,
    })
  }

  deletePerson(personId: number) {
    return this.prisma.user.delete({ where: { id: personId } })
  }
}
