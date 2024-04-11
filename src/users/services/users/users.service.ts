import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/typeorm/entities/User'
import { UserData } from 'src/utils/types'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  fetchUsers() {
    return this.userRepository.find()
  }

  getUserById(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  updateUser(id: number, userData: UserData) {
    return this.userRepository.update({ id }, { ...userData })
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id })
  }
}
