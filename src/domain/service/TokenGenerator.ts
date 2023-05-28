import type User from '../entity/User'

export default interface TokenGenerator {
  generate(user: User, expiredIn: number): string
  verify(token: string): Payload
}

type Payload = {
  email: string
}
