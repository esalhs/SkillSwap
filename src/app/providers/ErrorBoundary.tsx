import { Component, ErrorInfo, ReactNode } from 'react'
import { ServerErrorPage } from '../../pages/ServerErrorPage'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryStateProps {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryStateProps> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ServerErrorPage />
    }
    return this.props.children
  }
}

export default ErrorBoundary