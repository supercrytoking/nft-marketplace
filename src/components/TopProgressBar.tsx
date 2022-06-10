import Router from 'next/router'
import color from 'randomcolor'
import NProgress from 'nprogress'
import { useEffect } from 'react'

// let timer
// let state
// const activeRequests = 0
// const delay = 250

// function load() {
//     if (state === 'loading') {
//         return
//     }

//     state = 'loading'

//     timer = setTimeout(() => {
//         NProgress.start()
//     }, delay) // only show progress bar if it takes longer than the delay
// }

// function stop() {
//     if (activeRequests > 0) {
//         return
//     }

//     state = 'stop'

//     clearTimeout(timer)
//     NProgress.done()
// }

// Router.events.on('routeChangeStart', load)
// Router.events.on('routeChangeComplete', stop)
// Router.events.on('routeChangeError', stop)

// const originalFetch = window.fetch
// window.fetch = async function (...args) {
//     if (activeRequests === 0) {
//         load()
//     }

//     activeRequests++

//     try {
//         const response = await originalFetch(...args)
//         return response
//     } catch (error) {
//         return Promise.reject(error)
//     } finally {
//         activeRequests -= 1
//         if (activeRequests === 0) {
//             stop()
//         }
//     }
// }

export default function TopProgressBar() {
    useEffect(() => {
        const start = () => NProgress.start()
        const done = () => NProgress.done()

        Router.events.on('routeChangeStart', start)
        Router.events.on('routeChangeComplete', done)

        return () => {
            Router.events.off('routeChangeStart', start)
            Router.events.on('routeChangeComplete', done)
        }
    }, [])

    return (
        <style jsx>
            {`
                // #nprogress .bar {
                //     background: ${color()} !important;
                //     opacity: 0.9;
                //     height: 100vh;
                // }

                // #nprogress .peg {
                //     display: none;
                //     box-shadow: 0 0 10px #ffbb00, 0 0 5px #ffbb00;
                // }

                // #nprogress .spinner-icon {
                //     border-top-color: ${color()};
                //     border-left-color: ${color()};
                //     border-right-color: ${color()};
                //     border-bottom-color: ${color()};
                // }
            `}
        </style>
    )
}
