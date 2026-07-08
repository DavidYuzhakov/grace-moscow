import type { Core } from '@strapi/strapi'

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      register: {
        // Разрешаем Strapi принимать эти поля при OAuth-регистрации
        allowedFields: ['name'],
      },
    },
  },
})

export default config
