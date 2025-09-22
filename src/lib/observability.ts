export function initObservability() {
  if (typeof window === 'undefined') return

  const log = (level: 'error'|'warn'|'info', message: string, extra?: unknown) => {
    // For now, just console. Hook here to send to Sentry/Logflare/etc.
    console[level](`[obs] ${message}`, extra)
  }

  window.addEventListener('error', (event) => {
    log('error', 'window.error', { message: event.message, filename: event.filename, lineno: event.lineno, colno: event.colno })
  })

  window.addEventListener('unhandledrejection', (event) => {
    log('error', 'unhandledrejection', { reason: String(event.reason) })
  })

  log('info', 'observability initialized')
}

