const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Formats a "YYYY-MM-DD" string as "May 11, 2026" without timezone drift.
export function formatDate(value) {
  if (!value) return ''
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value)
  if (!match) return value
  const [, y, m, d] = match
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`
}

// Splits stored blog text into paragraphs on blank lines.
export function paragraphs(text) {
  return String(text ?? '')
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean)
}
