import User from '../domain/entity/User'
import type UserRepository from '../domain/repository/UserRepository'
import type EmailValidator from '../domain/validators/EmailValidator'

export default class Signup {
  constructor (readonly userRepository: UserRepository, readonly emailValidator: EmailValidator) {
  }

  async execute (input: Input): Promise<void> {
    const user = new User(input.name, input.email, input.password)
    await Promise.resolve(this.userRepository.save(user))
  }
}

type Input = {
  name: string
  email: string
  password: string
}
