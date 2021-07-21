import 'antd/dist/antd.css'
import Error from 'next/error'

export default function MyApp({ Component, pageProps }) {
  if (pageProps.error)
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    )
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}
