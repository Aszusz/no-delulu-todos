import { createContext, useContext } from 'react'
import { type Effects, defaultEffects } from './store/effects'

export const EffectsContext = createContext<Effects>(defaultEffects)

export function useEffects(): Effects {
  return useContext(EffectsContext)
}
