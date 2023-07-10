import Layout from './Mobile/Layout'

export default function RunTimeError({ error }: { error: Error }) {
  return (
    <Layout>
      <div className="text-center p-4">
        <h1>
            {error.name}: {error.message}
        </h1>
      </div>
    </Layout>
  )
}
