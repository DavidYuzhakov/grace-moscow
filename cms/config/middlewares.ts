import type { Core } from '@strapi/strapi'

const config: Core.Config.Middlewares = [
  {
    name: 'global::proxy-debug',
    config: {},
  },

  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  {
    name: 'strapi::session',
    config: {
      secure: true,
    },
  },
  'strapi::favicon',
  'strapi::public',
]

export default config
