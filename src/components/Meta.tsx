import Head from 'next/head'

const Meta = () => {
    const title = 'Fugly Fantom Frogs'
    const description = '3,333 disgusting frogs that are part of a cult. They are the Fugly Fantom Frogs... and this is their story.'
    const url = 'https://fuglyfrogs.com'

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:type" content="website" />
            <meta name="og:title" property="og:title" content={title} />
            <meta name="og:description" property="og:description" content={description} />
            <meta property="og:site_name" content={title} />
            <meta property="og:url" content={url} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:site" content={url} />
            <link rel="icon" type="image/png" href={`${url}/img/previews/5.png`} />
            <meta property="og:image" content={`${url}/img/loop-2.gif`} />
            <meta name="twitter:image" content={`${url}/img/loop-2.gif`} />
        </Head>
    )
}

export default Meta
