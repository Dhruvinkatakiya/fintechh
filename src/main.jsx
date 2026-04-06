import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function showRuntimeErrorOverlay(err) {
  try {
    let overlay = document.getElementById('__runtime_error_overlay__')
    if (!overlay) {
      overlay = document.createElement('div')
      overlay.id = '__runtime_error_overlay__'
      Object.assign(overlay.style, {
        position: 'fixed',
        inset: '0',
        background: 'rgba(0,0,0,0.85)',
        color: '#fff',
        padding: '20px',
        zIndex: 999999,
        overflow: 'auto',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace',
      })
      document.body.appendChild(overlay)
    }
    const msg = err && err.stack ? err.stack : String(err)
    overlay.innerHTML = `<h2 style="margin:0 0 8px 0">Runtime Error</h2><pre style="white-space:pre-wrap;">${msg}</pre>`
  } catch (e) {
    // ignore overlay failures
    // eslint-disable-next-line no-console
    console.error('Failed to render runtime overlay', e)
  }
}

window.addEventListener('error', (e) => {
  showRuntimeErrorOverlay(e.error || e.message || e)
})
window.addEventListener('unhandledrejection', (e) => {
  showRuntimeErrorOverlay(e.reason || e)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
