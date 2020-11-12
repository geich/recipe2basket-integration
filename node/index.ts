import './globals'

import { LRUCache, Service, method } from '@vtex/api'

import { Clients } from './clients'

const SIX_SECONDS_MS = 6 * 1000

const MAX_SEGMENT_CACHE = 10000
const segmentCache = new LRUCache<string, any>({ max: MAX_SEGMENT_CACHE })
const catalogCache = new LRUCache<string, any>({max: 3000})
const messagesCache = new LRUCache<string, any>({max: 3000})


import { products } from './handlers/products'
import { categories } from './handlers/categories'
import { simulation } from './handlers/simulation'

metrics.trackCache('segment', segmentCache)
metrics.trackCache('catalog', catalogCache)
metrics.trackCache('messages', messagesCache)

export default new Service({
  clients: {
    implementation: Clients,
    options: {
      catalog: {
        concurrency: 10,
        memoryCache: catalogCache,
        metrics,
        timeout: SIX_SECONDS_MS,
      }
    }
  },
  routes: {
    products: method({
      POST: [products],
    }),
    categories: method({
      POST: [categories],
    }),
    simulation: method({
      POST: [simulation],
    })
  },
})
