type HarmCategory =
  | 'HARM_CATEGORY_HATE_SPEECH'
  | 'HARM_CATEGORY_DANGEROUS_CONTENT'
  | 'HARM_CATEGORY_HARASSMENT'
  | 'HARM_CATEGORY_SEXUALLY_EXPLICIT'

type HarmProbability = 'NEGLIGIBLE' | 'LOW' | 'MEDIUM' | 'HIGH'

type FinishReason = 'STOP' | 'MAX_TOKENS' | 'SAFETY' | 'RECITATION' | 'OTHER'

interface Part {
  text: string
}

interface Content {
  parts: Part[]
  role: 'model' | 'user'
}

interface SafetyRating {
  category: HarmCategory
  probability: HarmProbability
}

interface TokenDetails {
  modality: 'TEXT'
  tokenCount: number
}

interface UsageMetadata {
  promptTokenCount: number
  candidatesTokenCount: number
  totalTokenCount: number
  promptTokensDetails: TokenDetails[]
  candidatesTokensDetails: TokenDetails[]
}

interface Candidate {
  content: Content
  finishReason: FinishReason
  safetyRatings: SafetyRating[]
  avgLogprobs?: number
}

export interface GeminiApiResponseDto {
  candidates: Candidate[]
  usageMetadata: UsageMetadata
  modelVersion: string
  responseId: string
}
