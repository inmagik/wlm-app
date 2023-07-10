import {
  Route,
  Routes,
  BrowserRouter,
  Outlet,
  useParams,
  useLocation,
} from 'react-router-dom'
import List from './pages/Mobile/List'
import { I18nextProvider, useTranslation } from 'react-i18next'
import Map from './pages/Mobile/Map'
import Profile from './pages/Mobile/Profile'
import NotFound from './pages/NotFound'
import { LANGS } from './const'
import { useEffect } from 'react'
import { createI18n, DEFAULT_LANG, getLangFromParam } from './i18n'
import ErrorBoundary from './components/ErrorBoundary'
import NavigationWrapper from './components/NavigationWrapper'

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
  return (
    <>
      <Routes location={location}>
        <Route path={':lang/*'} element={<SyncLang />} />
        <Route path="*" element={<SyncLang />} />
      </Routes>
      <Routes location={location}>
        <Route element={<NavigationWrapper />}>
          <Route
            index
            element={
              <NavigationWrapper>
                <Map />
              </NavigationWrapper>
            }
          />
          <Route path={':lang/*'} element={<AvailablesLang />}>
            <Route
              index
              element={
                <NavigationWrapper>
                  <Map />
                </NavigationWrapper>
              }
            />
            <Route path="lista" element={<List />} />
            <Route path="profilo" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

function App() {
  const i18n = createI18n(window.location.pathname)
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </I18nextProvider>
    </BrowserRouter>
  )
}

export default App
