import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/typeorm/entities/User'
import { UserData } from 'src/utils/types'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  createUserAccount(userData: UserData) {
    // Create user instance
    const newUser = this.userRepository.create({ ...userData })

    // Save user to database
    return this.userRepository.save(newUser) /// RETURNS A PROMISE
  }
}
