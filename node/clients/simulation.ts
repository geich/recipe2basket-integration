import {
  InstanceOptions,
  IOContext,
  JanusClient,
  RequestConfig
} from '@vtex/api'
import { checkoutCookieFormat, statusToError } from '../utils'

export class Simulation extends JanusClient {
  public constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...(options && options.headers),
        ...(ctx.storeUserAuthToken
          ? { VtexIdclientAutCookie: ctx.storeUserAuthToken }
          : null),
      },
    })
  }

  private getCommonHeaders = () => {
    const { orderFormId, segmentToken, sessionToken } = this
      .context as CustomIOContext
    const checkoutCookie = orderFormId ? checkoutCookieFormat(orderFormId) : ''
    const segmentTokenCookie = segmentToken
      ? `vtex_segment=${segmentToken};`
      : ''
    const sessionTokenCookie = sessionToken
      ? `vtex_session=${sessionToken};`
      : ''
    return {
      Cookie: `${checkoutCookie}${segmentTokenCookie}${sessionTokenCookie}`,
    }
  }

  public simulation = (simulation: SimulationPayload) =>
    this.post<SimulationOrderForm>(
      this.routes.simulation(simulation.sc),
      simulation,
      {
        metric: 'checkout-simulation',
      }
    )

  protected post = <T>(url: string, data?: any, config: RequestConfig = {}) => {
    config.headers = {
      ...config.headers,
      ...this.getCommonHeaders(),
    }
    return this.http.post<T>(url, data, config).catch(statusToError) as Promise<
      T
    >
  }

  private get routes() {
    const base = '/api/checkout/pub'
    return {
      simulation: (sc: string) =>
        `${base}/orderForms/simulation?sc=${sc}`
    }
  }
}
