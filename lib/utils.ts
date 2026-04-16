/** Format today's date in the editorial dateline format.
 *  e.g. "Thursday, April 17 — 6:15am"
 */
export function formatDateline(date: Date = new Date()): string {
  const dayName = date.toLocaleDateString('en-AU', { weekday: 'long' })
  const month   = date.toLocaleDateString('en-AU', { month: 'long' })
  const day     = date.getDate()
  const hours   = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm    = hours < 12 ? 'am' : 'pm'
  const h12     = hours % 12 === 0 ? 12 : hours % 12

  return `${dayName}, ${month} ${day} — ${h12}:${minutes}${ampm}`
}

/** Format time only: "6:15am" */
export function formatTime(date: Date = new Date()): string {
  const hours   = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm    = hours < 12 ? 'am' : 'pm'
  const h12     = hours % 12 === 0 ? 12 : hours % 12
  return `${h12}:${minutes}${ampm}`
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
