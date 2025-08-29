export interface UserDto {
  id: string
  fullname: string
  email: string
}

export interface UserWithPasswordDto extends UserDto {
  password: string
}

export type UserLoginState = {
  uid: string
}
