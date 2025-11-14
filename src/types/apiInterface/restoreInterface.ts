export interface SendRestoreEmailResponse {
  request_id: string
  message?: string
}

export interface ConfirmRestoreEmailResponse {
  email_verify_token: string
  expires_in: number
}

export interface SimpleError {
  message: string
  code?: string
}

export interface RestoreFormProps {
  email: string
  emailCode: string
  error: Record<string, string>
  emailSent: boolean
  isLoadingSend: boolean
  isLoadingConfirm: boolean
  onChangeEmail: (value: string) => void
  onChangeCode: (value: string) => void
  onSendEmail: () => void
  onConfirmCode: () => void
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
}
