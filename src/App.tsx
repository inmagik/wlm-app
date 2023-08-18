import {
  Route,
  Routes,
  BrowserRouter,
  Outlet,
  useParams,
  useLocation,
} from 'react-router-dom'
import { TopContextProvider } from './context/TopContext'
import List from './pages/Mobile/List'
import ListDesktop from './pages/Desktop/List'
import { I18nextProvider, useTranslation } from 'react-i18next'
import Map from './pages/Mobile/Map'
import MapDesktop from './pages/Desktop/Map'
import Profile from './pages/Mobile/Profile'
import ProfileDesktop from './pages/Desktop/Profile'
import NotFound from './pages/NotFound'
import { LANGS } from './const'
import { useEffect } from 'react'
import { createI18n, DEFAULT_LANG, getLangFromParam } from './i18n'
import ErrorBoundary from './components/ErrorBoundary'
import Detail from './pages/Mobile/Detail'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NavigationWrapper from './components/Mobile/NavigationWrapper'
import Auth from './hooks/auth'
import RedirectLogin from './pages/RedirectLogin'
import { isBrowserMobile } from './utils'
import { ToastContainer } from 'react-toastify'

function SyncLang() {
  const { i18n } = useTranslation()
  const params = useParams()
  const lang = params.lang ?? DEFAULT_LANG

  useEffect(() => {
    const memoryLang = i18n.language
    if (memoryLang !== lang) {
      const nextLang = getLangFromParam(lang)
      if (nextLang !== memoryLang) {
        i18n.changeLanguage(nextLang)
      }
    }
  }, [lang, i18n])

  return <Outlet />
}

function AvailablesLang() {
  const { lang } = useParams()
  if (LANGS.includes(lang ?? '')) {
    return <Outlet />
  }
  return <NotFound />
}

function AppRoutes() {
  const location = useLocation()
  const isMobile = isBrowserMobile()

  useEffect(() => {
    if (isMobile) {
      document.body.classList.add('mobile-version')
      document.body.classList.remove('desktop-version')
    } else {
      document.body.classList.add('desktop-version')
      document.body.classList.remove('mobile-version')
    }
  }, [isMobile])


  return (
    <TopContextProvider>
      <Routes location={location}>
        <Route path={':lang/*'} element={<SyncLang />} />
        <Route path="*" element={<SyncLang />} />
      </Routes>
      <Routes location={location}>
        <Route index element={isMobile ? <Map /> : <MapDesktop />} />
        <Route path={':lang/*'} element={<AvailablesLang />}>
          <Route index element={isMobile ? <Map /> : <MapDesktop />} />
          <Route path="lista" element={isMobile ? <List /> : <ListDesktop />} />
          <Route path="redirect-login" element={<RedirectLogin />} />
          <Route
            path="lista/:slug"
            element={
              isMobile ? (
                <NavigationWrapper>
                  <Detail />
                </NavigationWrapper>
              ) : (
                <ListDesktop />
              )
            }
          />
          <Route path="mappa" element={isMobile ? <Map /> : <MapDesktop />} />
          <Route
            path="mappa/:slug"
            element={
              isMobile ? (
                <NavigationWrapper>
                  <Detail />
                </NavigationWrapper>
              ) : (
                <MapDesktop />
              )
            }
          />
          <Route
            path="profilo"
            element={isMobile ? <Profile /> : <ProfileDesktop />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer
        style={{ zIndex: 999999 }}
        draggable={false}
      />
    </TopContextProvider>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // cacheTime: 3000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      networkMode: 'always',
      refetchOnMount: false,
      // staleTime: 300,
      retry: false,
      suspense: true,
      structuralSharing: false,
    },
  },
})

function App() {
  const i18n = createI18n(window.location.pathname)

  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <Auth>
              <AppRoutes />
            </Auth>
          </ErrorBoundary>
        </QueryClientProvider>
      </I18nextProvider>
    </BrowserRouter>
  )
}

export default App
