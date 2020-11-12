import { IOClients } from '@vtex/api'

import { Catalog } from './catalog'
import { Rewriter } from './rewriter'
import { Settings } from './settings'
import { Simulation } from "./simulation"
export class Clients extends IOClients {
  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get rewriter() {
    return this.getOrSet('rewriter', Rewriter)
  }

  public get simulation() {
    return this.getOrSet('simulation', Simulation)
  }

  public get appSettings() {
    return this.getOrSet('settings', Settings)
  }
}
