import { AuthResponseDto, LoginDto, RegisterDto } from './dto'
import { ErrorResponse } from '@/libs/http/ErrorResponse'
import { UserWithPasswordDto } from '@/service/user/dto'
import { StatusCodes } from 'http-status-codes'
import Hashing from '@/config/hash.config'
import JwtToken from '@/libs/jwtToken'
import db from '@/config/firebase.config'
import { env } from '@/config/env.config'
import { v4 } from 'uuid'

const jwt = new JwtToken({ secret: env.JWT_SECRET, expires: env.JWT_EXPIRES })

class AuthService {
  async signIn(formData: LoginDto): Promise<AuthResponseDto> {
    const userCollection = db.collection('users')

    const getUser = await userCollection
      .where('email', '==', formData.email)
      .get()

    console.log(formData.email)
    console.log(formData.password)

    if (getUser.empty) {
      throw new ErrorResponse.NotFound('Login failed, invalid credentials')
    }

    const userData = getUser.docs[0].data() as UserWithPasswordDto

    const hashPassword = new Hashing()

    const validatePassword = await hashPassword.verify(
      userData.password,
      formData.password
    )

    if (!validatePassword) {
      throw new ErrorResponse.NotFound('Login failed, invalid credentials')
    }

    const payload = JSON.parse(JSON.stringify({ uid: userData.id }))

    const { token, expiresIn } = jwt.generate(payload)

    const data = {
      id: userData.id,
      fullname: userData.fullname,
      email: userData.email,
      accessToken: token,
      expiresAt: new Date(Date.now() + expiresIn * 1000),
      expiresIn: expiresIn,
    }

    return data
  }

  async signUp(formData: RegisterDto): Promise<AuthResponseDto> {
    const userCollection = db.collection('users')

    const duplicateEmail = await userCollection
      .where('email', '==', formData.email)
      .get()

    if (!duplicateEmail.empty) {
      throw new ErrorResponse.BaseResponse(
        'Email already used',
        'CONFLICT',
        StatusCodes.CONFLICT
      )
    }

    const userId = v4()

    const hashPassword = new Hashing()

    await userCollection.doc(userId).set({
      id: userId,
      fullname: formData.fullname,
      email: formData.email,
      password: await hashPassword.hash(formData.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const getUser = await userCollection
      .where('email', '==', formData.email)
      .get()

    const userData = getUser.docs[0].data() as UserWithPasswordDto

    return await this.signIn({
      email: userData.email,
      password: formData.password,
    })
  }
}

const authService = new AuthService()

export default authService
