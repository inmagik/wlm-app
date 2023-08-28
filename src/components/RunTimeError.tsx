import { useTranslation } from 'react-i18next'
import Layout from './Mobile/Layout'

export default function RunTimeError({ error }: { error: Error }) {
  const { t } = useTranslation()
  return (
    <Layout>
      <div className="text-center p-4">
        <div>
          {t('si_e_verificato_un_errore_si_prega_di_ricaricare_la_pagina')}
        </div>
      </div>
    </Layout>
  )
}
