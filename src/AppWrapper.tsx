import { createContext, useContext } from "react"
import { useCookieState } from "use-cookie-state"

export const AppContext = createContext({})

export function AppWrapper({ children }) {
    const [_largeGrid, setLargeGrid] = useCookieState('fd-large-grid', true)
    const largeGrid = _largeGrid === 'true' || _largeGrid === true

    return <AppContext.Provider value={{ largeGrid, setLargeGrid }}>
        {children}
    </AppContext.Provider>
}

export default function useApp() {
    return useContext<any>(AppContext)
}