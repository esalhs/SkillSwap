import { StoreProvider } from './providers/StoreProvider'
import { AppRouter } from './providers/RouterProvider'
import './styles/global.css'
import ErrorBoundary from './providers/ErrorBoundary'

export function App() {
  return (
    <StoreProvider>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </StoreProvider>
  )
}
