import type User from '../../../domain/entity/User'
import type UserRepository from '../../../domain/repository/UserRepository'

export default class UserRepositoryMemory implements UserRepository {
  readonly users: User[]

  constructor () {
    this.users = []
  }

  async save (user: User): Promise<void> {
    this.users.push(user)
  }

  async loadByEmail (email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email)
  }
}
