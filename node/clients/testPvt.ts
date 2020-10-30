import {
    InstanceOptions,
    IOContext,
    JanusClient,
    RequestConfig,
  } from '@vtex/api'
  
  
  const FOUR_SECONDS = 4 * 1000
  const basePVT = '/api/catalog_system/pvt/products'
  
  export class TestPvt extends JanusClient {
    public constructor(ctx: IOContext, options?: InstanceOptions) {
      super(ctx, {
        ...options,
        headers: {
          ...(options && options.headers),
          VtexIdclientAutCookie: ctx.authToken,
        },
        timeout: FOUR_SECONDS,
      })
    }

    public getProductAndSkuIds = (args: SearchArgsPvt) =>
    this.get<Product[]>(this.getProductsUrl(args), {
      metric: 'catalog-getProductAndSkuIds',
    })

    public getProduct = (productId: number) =>
    this.get<Product[]>(`${basePVT}/ProductGet/${productId}`, {
      metric: 'catalog-productGet',
    })
  
    protected get = <T>(url: string, config?: RequestConfig) =>
      this.http.get<T>(url, config) as Promise<T>
  
    private getProductsUrl = ({
      categoryId,
      from,
      to
    }: SearchArgsPvt) => {
      let productsUrl = `${basePVT}/GetProductAndSkuIds/?categoryId=${categoryId}`

      if(from) {
        productsUrl += `&_from=${from}`
      }

      if(to) {
        productsUrl += `&_to=${to}`
      }
        return productsUrl
    }
  }
  