import type { Core } from '@strapi/strapi'

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    // Переопределяем VK-провайдер, чтобы сохранить имя в пользовательском поле.
    strapi.server.app.proxy = true
    strapi
      .plugin('users-permissions')
      .service('providers-registry')
      .add('vk', {
        async authCallback({ accessToken, query, purest }: any) {
          const userId = query?.raw?.user_id
          const email = query?.raw?.email

          if (!userId) {
            throw new Error('VK user ID was not available.')
          }

          if (!email) {
            throw new Error('Email was not available from VK.')
          }

          const vk = purest({ provider: 'vk' })

          const res = await vk
            .get('users')
            .auth(accessToken)
            .qs({ id: userId, v: '5.122' })
            .request()

          const profile = res.body?.response?.[0]

          if (!profile) {
            throw new Error('VK profile was not available.')
          }

          const name = [profile.first_name, profile.last_name]
            .filter(Boolean)
            .join(' ')

          return {
            email,
            username: name || email.split('@')[0],
            name,
          }
        },
      })
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const pluginStore = strapi.store({
      environment: '',
      type: 'plugin',
      name: 'users-permissions',
    })

    const grantConfig = await pluginStore.get({ key: 'grant' })

    if (grantConfig && typeof grantConfig === 'object') {
      const config = grantConfig as any
      if (config.vk) {
        config.vk.scope = ['email']
        await pluginStore.set({ key: 'grant', value: grantConfig })
      }
    }
  },
}
