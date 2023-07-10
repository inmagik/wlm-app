import { useTranslation } from 'react-i18next'
import Layout from '../components/Mobile/Layout'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <Layout>
      <div className="h-100 w-100 d-flex align-items-center justify-content-center">
        <h2>{t('404_page_not_found')}</h2>
      </div>
    </Layout>
  )
}
