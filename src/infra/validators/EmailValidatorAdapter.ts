import validator from 'validator'
import type EmailValidator from '../../domain/validators/EmailValidator'

export default class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
