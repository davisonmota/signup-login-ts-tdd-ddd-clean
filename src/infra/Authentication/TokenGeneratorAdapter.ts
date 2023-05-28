import { sign, verify } from 'jsonwebtoken'
import type User from '../../domain/entity/User'
import type TokenGenerator from '../../domain/service/TokenGenerator'

export default class TokenGeneratorAdapter implements TokenGenerator {
  constructor (readonly key: string) {}

  generate (user: User, expiredIn: number): string {
    return sign({ email: user.email, expiredIn }, this.key)
  }

  verify (token: string): any {
    return verify(token, this.key)
  }
}
