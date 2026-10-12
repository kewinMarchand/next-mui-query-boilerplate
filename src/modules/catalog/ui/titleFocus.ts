let shouldFocusTitle = false

export const requestTitleFocus = () => {
  shouldFocusTitle = true
}

export const consumeTitleFocus = () => {
  const requested = shouldFocusTitle
  shouldFocusTitle = false
  return requested
}
