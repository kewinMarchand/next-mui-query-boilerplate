'use client'

import { Button } from '@kewinmarchand/boilerplates-ui/react'

import styles from '../styleguide.module.css'
import { StyleguideSection } from '../StyleguideSection'

const VARIANTS = ['primary', 'secondary', 'outline', 'ghost'] as const

const STATES = [
  { label: 'Défaut', className: '' },
  { label: 'Survol', className: 'bui-is-hover' },
  { label: 'Focus', className: 'bui-is-focus' },
  { label: 'Actif', className: 'bui-is-active' },
] as const

export const ButtonsSection = () => (
  <StyleguideSection title="Boutons">
    <p className={`bui-text ${styles.group}`}>
      Survol, focus et actif sont simulés par les classes d'état de la bibliothèque. Les vrais états
      se testent au pointeur et au clavier sur la ligne « Défaut ».
    </p>
    {VARIANTS.map((variant) => (
      <div key={variant} className={styles.group}>
        <h3 className={`bui-text bui-text--h3 ${styles.sectionTitle}`}>{variant}</h3>
        <div className="bui-cluster bui-gap-4">
          {STATES.map((state) => (
            <Button key={state.label} variant={variant} className={state.className}>
              {state.label}
            </Button>
          ))}
          <Button variant={variant} disabled>
            Désactivé
          </Button>
          <Button variant={variant} loading>
            Chargement
          </Button>
        </div>
      </div>
    ))}
  </StyleguideSection>
)
