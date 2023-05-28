import type UserRepository from '../domain/repository/UserRepository'
import type TokenGenerator from '../domain/service/TokenGenerator'

export default class Login {
  constructor (readonly userRepository: UserRepository, readonly tokenGenerator: TokenGenerator) {}

  async execute (input: Input): Promise<OutPut> {
    const user = await this.userRepository.loadByEmail(input.email)
    if (!user) throw new Error('User not found')
    if (input.password !== user.password) throw new Error('Authentication fails')
    const token = this.tokenGenerator.generate(user, 10000000)
    return {
      name: user.name,
      email: user.email,
      token
    }
  }
}

type Input = {
  email: string
  password: string
}

type OutPut = {
  name: string
  email: string
  token: string
}
