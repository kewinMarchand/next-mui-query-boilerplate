import { serializeCatalogQuery } from '../common/models/catalogQuery'

import type { Catalog } from '../common/models/catalog'

interface QueryHiddenFieldsProps {
  query: Catalog.Query
  omit: string[]
}

export const QueryHiddenFields = ({ query, omit }: QueryHiddenFieldsProps) => (
  <>
    {[...serializeCatalogQuery(query).entries()]
      .filter(([key]) => !omit.includes(key))
      .map(([key, value]) => (
        <input key={`${key}-${value}`} type="hidden" name={key} value={value} />
      ))}
  </>
)
