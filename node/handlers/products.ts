import { json } from "co-body"

export async function products(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { catalog, appSettings }, headers: { api_token }
  } = ctx
  const { r2bApiKey } = await appSettings.getSettings()
  
  if(!r2bApiKey) {
    ctx.body = "Please configure Recipe2Basket in the apps admin."
    ctx.res.statusCode = 400
  } else if(api_token === r2bApiKey ) {
    const body = await json(ctx.req)
    ctx.body = await catalog.products({ 
      query: body.query || null,
      category:  body.category || null,
      specificationFilters: body.specificationFilters || null,
      priceRange:  body.priceRange || null,
      collection:  body.collection || null,
      salesChannel:  body.salesChannel || null,
      orderBy:  body.orderBy || null,
      from: body.from || null,
      to: body.to || null,
      map:  body.map || null,
      hideUnavailableItems: body.hideUnavailableItems || false  
    })
  } else {
    ctx.body = "Unauthorized"
    ctx.res.statusCode = 401
  }

  ctx.set('cache-control', 'no-cache')
  await next()
}