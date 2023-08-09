import { useRouter } from 'next/router'
import React, { createContext, useContext, ReactNode, useReducer, useEffect } from 'react'

import { SideDrawerProps } from 'components/decks/SideDrawer'

const OPEN_DECK = 'OPEN_DECK'
const CLOSE_DECK = 'CLOSE_DECK'

export type Deck = 'primary' | 'secondary'
// e.g.
// {primary: <div>Hello</div>}
// {primary: <div>Hello</div>, secondary: <div>World</div>}
type DeckType = Partial<{ [key in Deck]: ReactNode }> & {
  primaryProps?: Partial<SideDrawerProps>
  secondaryProps?: Partial<SideDrawerProps>
}
type DeckAction =
  | {
      type: 'OPEN_DECK'
      payload: DeckType
    }
  | {
      type: 'CLOSE_DECK'
      payload?: Deck
    }

type SidekickState = {
  primary: ReactNode
  primaryProps: Partial<SideDrawerProps>
  secondary: ReactNode
  secondaryProps: Partial<SideDrawerProps>
}
const initialState = (): SidekickState => ({
  primary: null,
  primaryProps: {},
  secondary: null,
  secondaryProps: {},
})

function reducer(state = initialState(), action: DeckAction): SidekickState {
  switch (action.type) {
    case OPEN_DECK: {
      if (action.payload.secondary) {
        if (state.primary) {
          return {
            ...state,
            secondary: action.payload.secondary,
            // Passing an empty object effectively resets the props values between calls to open.
            // This is expected, so props don't "bleed" over calls.
            secondaryProps: action.payload.secondaryProps || {},
          }
        }
        // Replace secondary with primary
        // Do not show secondary if there's no primary deck
        return {
          ...state,
          primary: action.payload.secondary,
          primaryProps: action.payload.secondaryProps || {},
        }
      }
      return {
        ...state,
        primary: action.payload.primary,
        primaryProps: action.payload.primaryProps || {},
        secondary: action.payload.secondary,
        secondaryProps: action.payload.secondaryProps || {},
      }
    }
    case CLOSE_DECK:
      if (!action.payload || action.payload === 'primary') {
        return {
          ...state,
          primary: null,
          secondary: null,
        }
      }
      if (action.payload === 'secondary') {
        return {
          ...state,
          secondary: null,
        }
      }
    default:
      return state
  }
}

const SidekickContext = createContext<[SidekickState, React.Dispatch<DeckAction>]>(null as any)

export function SidekickProvider({ children }: { children?: ReactNode }) {
  const context = useReducer(reducer, initialState())
  return <SidekickContext.Provider value={context}>{children}</SidekickContext.Provider>
}

export function useSidekick() {
  const router = useRouter()
  const [state, dispatch] = useContext(SidekickContext)

  // Register route change event handlers
  useEffect(() => {
    router.events.on('routeChangeStart', () => dispatch({ type: CLOSE_DECK }))

    return () => {
      router.events.off('routeChangeStart', () => dispatch({ type: CLOSE_DECK }))
    }
  }, [])

  return {
    ...state,
    open: (payload: DeckType) => dispatch({ type: OPEN_DECK, payload }),
    close: (deck?: Deck) => dispatch({ type: CLOSE_DECK, payload: deck }),
  }
}
