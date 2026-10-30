'use client'

import {
  Checkbox,
  RadioGroup,
  Select,
  Switch,
  TextArea,
  TextField,
} from '@kewinmarchand/boilerplates-ui/react'

import styles from '../styleguide.module.css'
import { StyleguideSection } from '../StyleguideSection'

const EXPOSURES = [
  { value: 'soleil', label: 'Soleil' },
  { value: 'mi-ombre', label: 'Mi-ombre' },
  { value: 'ombre', label: 'Ombre' },
]

const SIZES = [
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
]

export const FormsSection = () => (
  <StyleguideSection title="Formulaires">
    <form noValidate className={styles.form}>
      <TextField id="charte-nom" label="Nom" hint="Aide : votre nom complet." autoComplete="name" />
      <TextField
        id="charte-email"
        label="E-mail"
        type="email"
        error="Indiquez une adresse e-mail valide, par exemple nom@domaine.fr."
        defaultValue="nom@"
        autoComplete="email"
      />
      <div className="bui-field">
        <label className="bui-field__label" htmlFor="charte-quantite">
          Quantité
        </label>
        <input
          className="bui-field__input"
          id="charte-quantite"
          type="number"
          inputMode="numeric"
          min={0}
        />
      </div>
      <TextField id="charte-desactive" label="Désactivé" disabled defaultValue="Non modifiable" />
      <TextArea id="charte-message" label="Message" rows={3} />
      <Select id="charte-exposition" label="Exposition" options={EXPOSURES} defaultValue="soleil" />
      <div>
        <Checkbox id="charte-case" label="Case cochée" defaultChecked />
        <Checkbox id="charte-case-desactivee" label="Case désactivée" disabled />
        <Switch id="charte-interrupteur" label="Interrupteur" defaultChecked />
      </div>
      <RadioGroup
        id="charte-taille"
        legend="Taille"
        name="taille"
        options={SIZES}
        defaultValue="M"
      />
    </form>
  </StyleguideSection>
)
