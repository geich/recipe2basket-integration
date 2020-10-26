import slugify from 'slugify'
import { toLower } from 'ramda'
import { removeAccents } from "./utils"

export function Slugify(str: any) {
  return slugify(str, { lower: true, remove: /[*+~.()'"!:@]/g })
}

// Parameter "S. Coifman" should output "s--coifman"
export function catalogSlugify(str: string) {
  // According to Bacelar, the catalog API uses a legacy method for slugifying strings.
  // replaces special characters with dashes, remove accents and lower cases everything
  // eslint-disable-next-line no-useless-escape
  const replaced = str.replace(/[*+~.()'"!:@&\[\]`,/ %$#?{}|><=_^]/g, '-')
  return toLower(removeAccents(replaced))
}
