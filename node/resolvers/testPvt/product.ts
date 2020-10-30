import {
    compose,
    map,
    reject,
    toPairs,
  } from 'ramda'
  
  type MaybeRecord = false | Record<string, any>
  const objToNameValue = (
    keyName: string,
    valueName: string,
    record: Record<string, any>
  ) =>
    compose<Record<string, any>, [string, any][], MaybeRecord[], MaybeRecord>(
      reject<MaybeRecord>(value => typeof value === 'boolean' && value === false),
      map<[string, any], MaybeRecord>(
        ([key, value]) =>
          typeof value === 'string' && { [keyName]: key, [valueName]: value }
      ),
      toPairs
    )(record)
  
  export const resolvers = {
    Product: {
      cacheId: ({ linkText }: any) => linkText,
  
      clusterHighlights: ({ clusterHighlights = {} }) =>
        objToNameValue('id', 'name', clusterHighlights),
  
      jsonSpecifications: (product: any) => {
        const { Specifications = [] } = product
        const specificationsMap = Specifications.reduce((acc: any, key: any) => {
          acc[key] = product[key]
          return acc
        }, {})
        return JSON.stringify(specificationsMap)
      },
  
      productClusters: ({ productClusters = {} }) =>
        objToNameValue('id', 'name', productClusters),
  
      properties: (product: any) =>
        map(
          (name: string) => ({ name, values: product[name] }),
          product.allSpecifications || []
        ),
  
      
    },
  }
  