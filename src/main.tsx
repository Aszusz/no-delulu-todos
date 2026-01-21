import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { EffectsContext } from './EffectsContext'
import { defaultEffects, type Effects } from './store/effects'
import './index.css'
import App from './App.tsx'

async function main() {
  let appStore = store
  let effects: Effects = defaultEffects

  // In test mode, wait for harness configuration
  if (import.meta.env.VITE_TEST_HARNESS) {
    const { testHarness } = await import('./testHarness')
    appStore = await testHarness.waitForReady()
    effects = testHarness.getEffects()
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={appStore}>
        <EffectsContext.Provider value={effects}>
          <App />
        </EffectsContext.Provider>
      </Provider>
    </StrictMode>
  )
}

main()
