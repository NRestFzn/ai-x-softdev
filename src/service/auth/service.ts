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
    try {
      const userCollection = db.collection('users')
      const getUser = await userCollection.where('email', '==', formData.email).get()

      if (getUser.empty) {
        throw new ErrorResponse.NotFound('Login gagal, email atau password salah')
      }

      const userData = getUser.docs[0].data() as UserWithPasswordDto

      const hashPassword = new Hashing()
      const validatePassword = await hashPassword.verify(userData.password, formData.password)

      if (!validatePassword) {
        throw new ErrorResponse.NotFound('Login gagal, email atau password salah')
      }

      const payload = { uid: userData.id }
      const { token, expiresIn } = jwt.generate(payload)

      const data = {
        id: userData.id,
        fullname: userData.fullname,
        email: userData.email,
        accessToken: token,
        expiresAt: new Date(Date.now() + expiresIn * 1000),
        expiresIn,
      }

      return data
    } catch (error) {
      throw error
    }
  }

  async signUp(formData: RegisterDto): Promise<AuthResponseDto> {
    try {
      if (!formData.fullname || !formData.email || !formData.password) {
        throw new ErrorResponse.BaseResponse(
          'Semua field wajib diisi',
          'BAD_REQUEST',
          StatusCodes.BAD_REQUEST
        )
      }

      const userCollection = db.collection('users')

      const duplicateEmail = await userCollection.where('email', '==', formData.email).get()
      if (!duplicateEmail.empty) {
        throw new ErrorResponse.BaseResponse(
          'Email sudah terdaftar',
          'CONFLICT',
          StatusCodes.CONFLICT
        )
      }
      
      const userId = v4()

      const hashPassword = new Hashing()
      const hashedPassword = await hashPassword.hash(formData.password)

      const userData = {
        id: userId,
        fullname: formData.fullname,
        email: formData.email,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      await userCollection.doc(userId).set(userData)

      const getUser = await userCollection.where('email', '==', formData.email).get()
      if (getUser.empty) {
        throw new ErrorResponse.BaseResponse(
          'Gagal membuat pengguna',
          'INTERNAL_SERVER_ERROR',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      }

      const retrievedUserData = getUser.docs[0].data() as UserWithPasswordDto

      const authResponse = await this.signIn({
        email: retrievedUserData.email,
        password: formData.password,
      })

      return authResponse
    } catch (error) {
      throw error
    }
  }
}

const authService = new AuthService()
export default authService