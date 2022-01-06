import '../styles/global.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import axios from 'axios'
import { UseWalletProvider } from 'use-wallet'
import Header from '../components/Header'
import { api } from '../utils/utils'

const fetcher = (url) => api.get(url).then((res) => res.data)

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <UseWalletProvider chainId={250}>
                <SWRConfig value={{ fetcher }}>
                    <Header />
                    <Component {...pageProps} />
                </SWRConfig>
            </UseWalletProvider>
        </>
    )
}
