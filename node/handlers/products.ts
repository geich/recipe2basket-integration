export async function products(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { catalog, appSettings }, query, headers: { api_token }
  } = ctx
  const { r2bApiKey } = await appSettings.getSettings()
  
  if(!r2bApiKey) {
    ctx.body = "Please configure Recipe2Basket in the apps admin."
    ctx.res.statusCode = 400
  } else if(api_token === r2bApiKey ) {
    ctx.body = await catalog.products({ 
      query: query.query || null,
      category:  query.category || null,
      specificationFilters: query.specificationFilters || null,
      priceRange:  query.priceRange || null,
      collection:  query.collection || null,
      salesChannel:  query.salesChannel || null,
      orderBy:  query.orderBy || null,
      from: query.from || null,
      to: query.to || null,
      map:  query.map || null,
      hideUnavailableItems: query.hideUnavailableItems || false  
    })
  } else {
    ctx.body = "Unauthorized"
    ctx.res.statusCode = 401
  }

  ctx.set('cache-control', 'no-cache')
  await next()
}