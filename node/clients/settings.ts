import { ExternalClient, InstanceOptions, IOContext, Apps } from '@vtex/api'


export class Settings extends ExternalClient {
  public r2bApiKey?: string

  public constructor(context: IOContext, options?: InstanceOptions) {
    super(``, context, options)
  }

  private async getApiKey(vtex: IOContext) {
    const apps = new Apps(vtex)
    const appId = process.env.VTEX_APP_ID as string
    const settings = await apps.getAppSettings(appId)
    this.r2bApiKey = settings.r2bApiKey
    return
  }

  public async getSettings() {
    if (!this.r2bApiKey) {
      await this.getApiKey(this.context)
    }

    return { r2bApiKey: this.r2bApiKey}
  }
}
