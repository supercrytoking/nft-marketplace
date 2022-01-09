import '../styles/global.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import axios from 'axios'
import { UseWalletProvider } from 'use-wallet'
import Head from 'next/head'
import Header from '../components/Header'
import { api } from '../utils/utils'
import Meta from '../components/Meta'

const fetcher = (url) => api.get(url).then((res) => res.data)

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Meta />
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                    integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </Head>
            <UseWalletProvider>
                <SWRConfig value={{ fetcher }}>
                    <Header />
                    <Component {...pageProps} />
                </SWRConfig>
            </UseWalletProvider>
        </>
    )
}
