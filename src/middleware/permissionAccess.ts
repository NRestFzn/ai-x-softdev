// import { green } from 'colorette'
// import { NextFunction, Request, Response } from 'express'
// import { logger } from '@/config/httplogger.config'
// import asyncHandler from '@/helper/asyncHandler'
// import { UserDto, UserLoginState } from '@/src/service/user/dto'
// import { ErrorResponse } from '@/libs/http/ErrorResponse'
// import db from '@/config/firebase.config'

// export function permissionAccess(roleIds: string[]) {
//   return asyncHandler(
//     async (req: Request, res: Response, next: NextFunction) => {
//       const { uid: user_id } = req.getState('userLoginState') as UserLoginState

//       const userCollection = db.collection('users')

//       const getUser = await userCollection.where('id', '==', user_id).get()

//       const userData = getUser.docs[0].data() as UserDto

//       const errType = `permitted access error:`
//       const errMessage = 'you are not allowed'

//       if (userData && !roleIds.includes(userData.RoleId)) {
//         const msgType = green('permission')
//         logger.error(`${msgType} - ${errType} ${errMessage}`)

//         throw new ErrorResponse.Forbidden(`${errType} ${errMessage}`)
//       }

//       next()
//     }
//   )
// }

// export function notPermittedAccess(roleIds: string[]) {
//   return asyncHandler(
//     async (req: Request, res: Response, next: NextFunction) => {
//       const repo = {
//         user: User,
//       }

//       const { uid: user_id } = req.getState('userLoginState') as UserLoginState
//       const getUser = await repo.user.findOne({ where: { id: user_id } })

//       const errType = `not permitted access error:`
//       const errMessage = 'you are not allowed'

//       if (getUser && roleIds.includes(getUser.RoleId)) {
//         const msgType = green('permission')
//         logger.error(`${msgType} - ${errType} ${errMessage}`)

//         throw new ErrorResponse.Forbidden(`${errType} ${errMessage}`)
//       }

//       next()
//     }
//   )
// }
