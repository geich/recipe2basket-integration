import { IOClients } from '@vtex/api'

import { Catalog } from './catalog'
import { Rewriter } from './rewriter'
import { Settings } from './settings'
import { Session } from './session'
import { TestPvt } from './testPvt'

export class Clients extends IOClients {
  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get rewriter() {
    return this.getOrSet('rewriter', Rewriter)
  }

  public get appSettings() {
    return this.getOrSet('settings', Settings)
  }

  public get customSession() {
    return this.getOrSet('customSession', Session)
  }

  public get testPvt() {
    return this.getOrSet('customSession', TestPvt)
  }
}
