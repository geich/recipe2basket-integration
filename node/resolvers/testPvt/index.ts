import { resolvers as productResolvers } from "./product"

export const queries = {
  getProductAndSkuIds: (_: any, __: any, { clients: { testPvt } }: Context) =>
  testPvt.getProductAndSkuIds,
}


export const fieldResolvers = {
  ...productResolvers
}