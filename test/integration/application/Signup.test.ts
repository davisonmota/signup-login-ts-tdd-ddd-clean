import Login from '../../../src/application/Login'
import Signup from '../../../src/application/Signup'
import TokenGeneratorAdapter from '../../../src/infra/Authentication/TokenGeneratorAdapter'
import UserRepositoryMemory from '../../../src/infra/repository/memory/UserRepositoryMemory'
import EmailValidatorAdapter from '../../../src/infra/validators/EmailValidatorAdapter'

describe('Signup', () => {
  test('Deve fazer signup', async () => {
    const userRepository = new UserRepositoryMemory()
    const emailValidator = new EmailValidatorAdapter()
    const signup = new Signup(userRepository, emailValidator)
    const inputSignup = {
      name: 'Davison Mota',
      email: 'davison@gmail.com',
      password: '123456789'
    }
    await signup.execute(inputSignup)

    const tokenGenerated = new TokenGeneratorAdapter('secret')
    const login = new Login(userRepository, tokenGenerated)
    const inputLogin = {
      email: 'davison@gmail.com',
      password: '123456789'
    }

    jest.spyOn(tokenGenerated, 'generate')
      .mockReturnValueOnce('valid_token')

    const output = await login.execute(inputLogin)
    expect(output.name).toBe('Davison Mota')
    expect(output.email).toBe('davison@gmail.com')
    expect(output.token).toBe('valid_token')
  })
})
