import { AppProps } from 'next/dist/next-server/lib/router/router'
import '../styles/globals.css'
import Axios from 'axios'

Axios.defaults.baseURL="http://localhost:5000/api"
Axios.defaults.withCredentials= true



function MyApp({ Component, pageProps }:AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
