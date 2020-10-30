import {
  fieldResolvers as catalogFieldResolvers,
  queries as catalogQueries,
} from './catalog'

import {
    queries as testPvt,
    fieldResolvers as testPvtResolvers
  } from './testPvt'



export const resolvers = {
  ...catalogFieldResolvers,
  ...testPvtResolvers,
  Query: {
    ...catalogQueries,
    ...testPvt
  }
}
