export default (_config: any, { strapi }: any) => {
  return async (ctx: any, next: any) => {
    console.log('PROTO:', ctx.protocol)
    console.log('SECURE:', ctx.secure)
    console.log('XFWD:', ctx.headers['x-forwarded-proto'])
    await next()
  }
}
