import asyncHandler from '@/helper/asyncHandler'
import express, { Response, Request, NextFunction, response } from 'express'
import { FileParams, useMulter } from '@/libs/module/multer'
import _ from 'lodash'
import HttpResponse from '@/src/libs/http/HttpResponse'
import documentService from '@/service/document/service'
import fs from 'fs'
import PdfParse from 'pdf-parse'

const route = express.Router()

const uploadFile = useMulter({
  dest: 'public/uploads',
}).fields([{ name: 'file', maxCount: 1 }])

const setFileToBody = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const file_upload = req.pickSingleFieldMulter(['file'])
    req.setBody(file_upload)
    next()
  }
)

route.post(
  '/upload-file',
  uploadFile,
  setFileToBody,
  asyncHandler(async (req: Request, res: Response) => {
    const formData = req.getBody()

    const file = _.get(formData, 'file', {}) as FileParams

    const data = await documentService.uploadFile({
      filename: file.filename,
      path: `${file.destination.split('/')[1]}/${file.filename}`,
      ext: file.mimetype,
    })

    const httpResponse = HttpResponse.created({
      message: 'Document uploaded successfully',
      data,
    })

    res.status(201).json(httpResponse)
  })
)

route.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const data = await documentService.getAllDocument()

    const httpResponse = HttpResponse.get({
      message: 'Document uploaded successfully',
      data,
    })

    res.status(200).json(httpResponse)
  })
)

route.post(
  '/ask-question/:filepath',
  asyncHandler(async (req: Request, res: Response) => {
    const formData = req.getBody()

    const dataBuffer = fs.readFileSync(
      'public/uploads/1757692841408-resume_nashir_resta_fauzian.pdf'
    )

    const dataText = await PdfParse(dataBuffer)

    const data = await documentService.askQuestion(
      formData.question,
      dataText.text
    )

    res.status(200).json({
      message: 'success',
      data,
    })
  })
)

export { route as DocumentRouter }
