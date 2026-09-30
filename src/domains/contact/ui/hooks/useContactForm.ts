import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { sendContactMessage } from '@/domains/contact/api/sendContactMessage'
import { contactSchema } from '@/domains/contact/common/models/contactSchema'

import type { Contact } from '@/domains/contact/common/models/contactSchema'

const DEFAULT_VALUES: Contact.FormValues = { name: '', email: '', message: '' }

export const useContactForm = () => {
  const form = useForm<Contact.FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onBlur',
  })

  const mutation = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => form.reset(DEFAULT_VALUES),
  })

  const onSubmit = form.handleSubmit((values) => mutation.mutate(values))

  return { form, mutation, onSubmit }
}
