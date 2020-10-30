import {
  IOContext,
  MetricsAccumulator,
  SegmentData,
  ServiceContext,
  RecorderState,
  ParamsContext
} from '@vtex/api'

import { Clients } from './clients'

if (!global.metrics) {
  console.error('No global.metrics at require time')
  global.metrics = new MetricsAccumulator()
}

declare global {
  type Context = ServiceContext<Clients, RecorderState, CustomContext>

  interface CustomContext extends ParamsContext {
    cookie: string
    originalPath: string
    settings: string
    vtex: CustomIOContext,
    IOContext: IOContext
  }

  interface CustomIOContext extends IOContext {
    segment?: SegmentData
    orderFormId?: string
    currentProfile: CurrentProfile
  }

  interface CurrentProfile {
    email: string
    userId: string
  }

  interface Item {
    thumb: string
    name: string
    href: string
    criteria: string
    slug: string
  }

  interface DocumentResponseV2 {
    Id: string
    Href: string
    DocumentId: string
  }

  interface DocumentArgs {
    acronym: string
    fields: string[]
    id: string
    account?: string
  }

  interface DocumentSchemaArgs {
    dataEntity: string
    schema: string
  }

  interface DocumentsArgs {
    acronym: string
    fields: string[]
    page: number
    pageSize: number
    where: string
    sort: string
    schema?: string
    account?: string
  }

  interface CreateDocumentV2Args {
    dataEntity: string
    document: { document: any }
    schema?: string
  }

  interface UpdateDocumentArgs {
    acronym: string
    document: { fields: KeyValue[] }
    account?: string
    schema?: string
  }

  interface DeleteDocumentArgs {
    acronym: string
    documentId: string
  }

  interface KeyValue {
    key: string
    value: string
  }

  interface IncomingFile {
    filename: string
    mimetype: string
    encoding: string
  }

  interface SKU {
    itemId: string
    name: string
    nameComplete: string
    productName: string
    productDescription: string
    brandName: string
    variations: [Property]
    skuSpecifications: [SkuSpecification]
    productSpecifications: [ProductSpecification]
  }

  interface Property {
    name: string
    values: [string]
  }

  interface SkuSpecification {
    fieldName: string
    fieldValues: string[]
  }

  interface ProductSpecification {
    fieldName: string
    fieldValues: string[]
  }
}
