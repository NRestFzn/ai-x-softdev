import { DocumentDto } from './dto'
import dataSource from '@/database/config'
import { Document } from '@/database/entities/document.entity'
import { documentSchema } from './schema'
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai'
import { env } from '@/src/config/env.config'
import { ErrorResponse } from '@/src/libs/http/ErrorResponse'
import fs from 'fs'
import PdfParse from 'pdf-parse'

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(env.GEMINI_API_KEY)

const model: GenerativeModel = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
})

class DocumentService {
  async uploadFile(formData: DocumentDto): Promise<DocumentDto> {
    const documentRepository = dataSource.getRepository(Document)

    const values = documentSchema.validateSync(formData)

    const newFormData = documentRepository.create({
      filename: values.filename,
      path: values.path,
      ext: values.ext,
    })

    const data = await documentRepository.save(newFormData)

    return data
  }

  async getAllDocument(): Promise<DocumentDto[]> {
    const documentRepository = dataSource.getRepository(Document)

    const data = documentRepository.find()

    return data
  }

  async askQuestion(question: string, filename: string): Promise<string> {
    const documentRepository = dataSource.getRepository(Document)

    const document = await documentRepository.findOne({
      where: {
        filename,
      },
    })

    if (!document) {
      throw new ErrorResponse.NotFound('Document not found')
    }

    const filePath = `public/uploads/${document.filename}`

    if (!fs.existsSync(filePath)) {
      throw new ErrorResponse.NotFound('Document not found or might be deleted')
    }

    const dataBuffer = fs.readFileSync(filePath)

    const { text } = await PdfParse(dataBuffer)

    const prompt = `
        Anda adalah asisten AI yang bertugas menjawab pertanyaan HANYA berdasarkan KONTEKS di bawah ini.

        --- AWAL KONTEKS ---
        ${text}
        --- AKHIR KONTEKS ---

        PERTANYAAN PENGGUNA:
        "${question}"

        ATURAN PENTING:
        1. Baca dan pahami KONTEKS yang telah diberikan di atas.
        2. Jawab PERTANYAAN PENGGUNA secara akurat dan ringkas, HANYA menggunakan informasi dari dalam KONTEKS.
        3. Jika jawaban untuk pertanyaan tersebut TIDAK ADA di dalam KONTEKS. Jika pertanyaan diluar KONTEKS, jawab pertanyaan yang diajukan dengan jawaban misal:
           Jika ditanyakan "Apakah pada dokumen ini terdapat hal yang memuat tentang makanan?" maka beri jawaban seperti "Saya tidak bisa memberikan jawaban atas pertanyaan yang diajukan".
           Pada intinya jawablah dengan jawaban kalau hal yang ditanyakan itu diluar KONTEKS dan Kamu tidak bisa memberi jawabannya.
        4. Jangan pernah menggunakan pengetahuan umum Anda di luar KONTEKS yang diberikan.
        5. Jawaban harus mengikuti bahasa dari pertanyaan. Jika pertanyaan menggunakan bahasa inggris, maka jawablah dengan menggunakan bahasa inggris.
    `

    try {
      const result = await model.generateContent(prompt)
      const response = result.response
      const answer = response.text()

      return answer
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed:', error.message)
      } else {
        console.error('Failed: Unknown reason')
      }
      throw new ErrorResponse.BadRequest('Something happen')
    }
  }
}

const documentService = new DocumentService()

export default documentService
