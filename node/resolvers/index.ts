import {
  fieldResolvers as catalogFieldResolvers,
  queries as catalogQueries,
} from './catalog'



export const resolvers = {
  ...catalogFieldResolvers,
  Query: {
    ...catalogQueries,
  }
}
