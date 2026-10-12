import { SITE } from './site'

import type { AccessibilityAuditConfig } from './site'

export type ComplianceStatus = 'non conforme' | 'partiellement conforme' | 'totalement conforme'

const PARTIAL_THRESHOLD = 50
const FULL_RATE = 100

// RGAA : sans audit, ou sous 50 % de critères respectés, le site est non conforme.
export const getComplianceStatus = ({
  auditDate,
  complianceRate,
}: AccessibilityAuditConfig): ComplianceStatus => {
  if (!auditDate || complianceRate === null || complianceRate < PARTIAL_THRESHOLD) {
    return 'non conforme'
  }
  return complianceRate >= FULL_RATE ? 'totalement conforme' : 'partiellement conforme'
}

export const ACCESSIBILITY_COMPLIANCE = getComplianceStatus(SITE.accessibility)
