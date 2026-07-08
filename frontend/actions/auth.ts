'use server'

import { removeAuthToken } from '@/lib/auth/session'
import { User } from '@/models/User'
import { authService } from '@/services/auth.service'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  await removeAuthToken()
  redirect('/')
}

type RegisterState = {
  ok: boolean
  data?: User
  error?: string
  values?: {
    email: string
    name: string
    password: string
  }
}

type LoginState = {
  ok: boolean
  data?: User
  error?: string
  values?: {
    identifier: string
    password: string
  }
}

type StrapiError = {
  error: {
    message: string
  }
}

export async function registerAction(
  _: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const values = {
    name: formData.get('name')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    password: formData.get('password')?.toString() ?? '',
  }

  try {
    const user = await authService.register(values)
    return { ok: true, data: user }
  } catch (error: unknown) {
    let errorText = 'Не удалось зарегистрироваться'

    if (
      (error as StrapiError).error.message ===
      'Email or Username are already taken'
    ) {
      errorText = 'Эта почта уже существует'
    }

    return {
      values,
      ok: false,
      error: errorText,
    }
  }
}

export async function loginAction(
  _: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const values = {
    identifier: formData.get('identifier')?.toString() ?? '',
    password: formData.get('password')?.toString() ?? '',
  }

  try {
    const user = await authService.login(values)
    return { ok: true, data: user }
  } catch (error) {
    console.error(error)
    let errorText = 'Не удалось авторизоваться'

    if (
      (error as StrapiError).error.message === 'Invalid identifier or password'
    ) {
      errorText = 'Неверный email или пароль'
    }

    return {
      values,
      ok: false,
      error: errorText,
    }
  }
}
