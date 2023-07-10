import React, { Component } from 'react'
import { AxiosError } from 'axios'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useRef } from 'react'
import RunTimeError from './RunTimeError'
import NotFound from '../pages/NotFound'

function ClearErrorWhenNavigateAway({ clearError }: { clearError(): void }) {
  const location = useLocation()
  const prevLocationRef = useRef(location)

  useEffect(() => {
    const prevLocation = prevLocationRef.current
    if (prevLocation !== location) {
      clearError()
    }
  }, [location, clearError])

  return null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  inRouter?: boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  public static defaultProps = {
    inRouter: true,
  }

  state: { error: AxiosError | null } = {
    error: null,
  }

  // componentDidCatch(error: Error) {
  //   // Sentry
  // }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error }
  }

  resetError = () => {
    this.setState({ error: null })
  }

  clearError = () => this.setState({ error: null })

  render() {
    const { children, inRouter } = this.props
    const { error } = this.state
    if (error) {
      if (error.isAxiosError && error.response?.status === 404) {
        return (
          <>
            {inRouter && (
              <ClearErrorWhenNavigateAway clearError={this.resetError} />
            )}
            <NotFound />
          </>
        )
      }

      return (
        <>
          {inRouter && (
            <ClearErrorWhenNavigateAway clearError={this.resetError} />
          )}
          <RunTimeError error={error} />
        </>
      )
    }

    return children
  }
}