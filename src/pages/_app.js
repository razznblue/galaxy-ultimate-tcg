import '../styles/global.css'
import ProvidersWrapper from './app/ProvidersWrapper'

export default function App({ Component, pageProps: { session, ...pageProps} }) {
  return (
    <ProvidersWrapper>
      <Component {...pageProps} />
    </ProvidersWrapper>
  )
}