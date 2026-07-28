import { userService } from '@/services/user.service'

export async function GET() {
  const user = await userService.getMe()

  return Response.json(user)
}
