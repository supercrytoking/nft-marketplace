import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import { UseWalletProvider } from 'use-wallet'
import Header from '../components/Header'
import Meta from '../components/Meta'
import '../styles/global.css'
import { api } from '../utils/utils'
import dayjs from 'dayjs'
import Footer from '../components/Footer'
import 'nprogress/nprogress.css'; //styles of nprogress
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Meta />
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            </Head>
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
