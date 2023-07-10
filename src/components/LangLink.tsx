import { Link } from 'react-router-dom'
import { useLangPathPrefix } from '../hooks/lang'

export default function LangLink(props: Parameters<typeof Link>[0]) {
  return <Link {...props} to={`${useLangPathPrefix()}${props.to}`} />
}
