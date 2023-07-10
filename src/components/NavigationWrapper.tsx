import { ReactNode, Suspense } from 'react'
import { Spinner } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Layout from './Mobile/Layout'

interface NavigationWrapperProps {
  className?: string
  children?: ReactNode
}

export default function NavigationWrapper({
  children,
}: NavigationWrapperProps) {
  return (
    <Suspense
      fallback={
        <Layout>
          <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <Spinner />
          </div>
        </Layout>
      }
    >
      {children ? children : <Outlet />}
    </Suspense>
  )
}
