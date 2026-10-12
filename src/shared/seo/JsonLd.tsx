interface JsonLdProps {
  data: Record<string, unknown>
}

// Les chevrons sont échappés pour qu'aucune donnée ne puisse refermer la balise <script>.
export const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
)
