import type { Core } from '@strapi/strapi'

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    // Переопределяем Google провайдер
    strapi
      .plugin('users-permissions')
      .service('providers-registry')
      .add('google', {
        async authCallback({ accessToken, purest }: any) {
          const google = purest({ provider: 'google' })

          const res = await google
            .get('https://www.googleapis.com/oauth2/v3/userinfo')
            .auth(accessToken)
            .request()

          const { body } = res

          return {
            email: body.email,
            username: body.name || body.email.split('@')[0],
            name: `${body.given_name} ${body.family_name}`,
            provider: 'google',
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

    // Исправление TS
    if (grantConfig && typeof grantConfig === 'object') {
      const config = grantConfig as any
      if (config.google) {
        config.google.scope = ['openid', 'email', 'profile']
        await pluginStore.set({ key: 'grant', value: grantConfig })
      }
    }
  },
}
