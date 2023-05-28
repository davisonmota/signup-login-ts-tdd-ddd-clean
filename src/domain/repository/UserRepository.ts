import type User from '../entity/User'

export default interface UserRepository {
  save(user: User): Promise<void>
  loadByEmail(email: string): Promise<User | undefined>
}
