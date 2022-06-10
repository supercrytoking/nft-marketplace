import dayjs from 'dayjs'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import 'nprogress/nprogress.css'
import { SWRConfig } from 'swr'
import { UseWalletProvider } from 'use-wallet'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Meta from '../components/Meta'
import '../styles/global.css'
import { api } from '../utils/utils'
import NextNProgress from "nextjs-progressbar";


const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)


export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Meta />
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            </Head>
            <NextNProgress color="white"
            />

            <UseWalletProvider>
                <SWRConfig value={{
                    refreshInterval: 3000, fetcher: (url) => api.get(url).then((res) => res.data)

                }}>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </SWRConfig>
            </UseWalletProvider>
        </>
    )
}
