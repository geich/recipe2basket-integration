import { json } from "co-body"
import { mapCategories } from "./utils"

export async function categories(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { catalog, appSettings }, headers: { api_token }
  } = ctx
  const { r2bApiKey } = await appSettings.getSettings()
  
  if(!r2bApiKey) {
    ctx.body = "Please configure Recipe2Basket in the apps admin."
    ctx.res.statusCode = 400
  } else if(api_token === r2bApiKey ) {
    const body = await json(ctx.req)
    const treeLevel = body.treeLevel || 0
    const categories = await catalog.categories(treeLevel)
    ctx.body = mapCategories(categories, treeLevel)
  } else {
    ctx.body = "Unauthorized"
    ctx.res.statusCode = 401
  }

  ctx.set('cache-control', 'no-cache')
  await next()
}