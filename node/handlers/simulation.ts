import { json } from "co-body"

export async function simulation(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { simulation, appSettings }, headers: { api_token }
  } = ctx
  const { r2bApiKey } = await appSettings.getSettings()
  
  if(!r2bApiKey) {
    ctx.body = "Please configure Recipe2Basket in the apps admin."
    ctx.res.statusCode = 400
  } else if(api_token === r2bApiKey ) {
    const body = await json(ctx.req)
    ctx.body = await simulation.simulation(body)   
  } else {
    ctx.body = "Unauthorized"
    ctx.res.statusCode = 401
  }

  ctx.set('cache-control', 'no-cache')
  await next()
}