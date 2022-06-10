

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function LoadingIndicator() {
    return
}