import type { Contact } from '../common/models/contactSchema'

const LATENCY_MS = 300

export const sendContactMessage = (values: Contact.FormValues): Promise<Contact.FormValues> =>
  new Promise((resolve) => setTimeout(() => resolve(values), LATENCY_MS))
