export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto extends LoginDto {
  fullname: string
}

export interface AuthResponseDto {
  id: string
  fullname: string
  email: string
  accessToken: string
  expiresAt: Date
  expiresIn: number
}
