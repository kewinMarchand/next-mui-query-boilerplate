import { SITE } from '@/shared/config'
import { Icon, ICON_NAMES, LogoMark } from '@/shared/ui/kit'

import styles from '../styleguide.module.css'
import { StyleguideSection } from '../StyleguideSection'

const LOGO_BACKGROUNDS = [
  { label: 'Fond clair', className: styles.logo },
  { label: 'Fond sombre', className: `${styles.logo} ${styles.logoDark}` },
] as const

export const IconsLogoSection = () => (
  <>
    <StyleguideSection title="Icônes">
      <ul className={styles.icons}>
        {ICON_NAMES.map((name) => (
          <li key={name} className={styles.icon}>
            <Icon name={name} size={24} />
            <span className="bui-text bui-text--body-sm">{name}</span>
          </li>
        ))}
      </ul>
    </StyleguideSection>
    <StyleguideSection title="Logo">
      <div className="bui-cluster bui-gap-4">
        {LOGO_BACKGROUNDS.map((background) => (
          <div key={background.label} className={background.className}>
            <p className={`bui-text bui-text--body-sm ${styles.group}`}>{background.label}</p>
            <div className="bui-cluster bui-gap-4">
              <LogoMark size={48} />
              <span className={styles.logoName}>
                <LogoMark size={36} />
                {SITE.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </StyleguideSection>
  </>
)
