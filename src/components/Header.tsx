import Link from 'next/link'

export default function Header() {
    return (
        <>
            <div className="bg-blue-500 text-white">
                <div className="px-6 py-2 max-w-7xl mx-auto flex items-center space-x-4">
                    <p className="text-xs">Notice: This software is in beta and may be buggy. Use at your own risk.</p>
                </div>
            </div>
            <div className="px-6 pt-12 max-w-7xl mx-auto flex items-center space-x-4">
                <Link href="/" passHref>
                    <a>Home</a>
                </Link>
                <Link href="/explore" passHref>
                    <a>Explore</a>
                </Link>
                <Link href="/create" passHref>
                    <a>Create</a>
                </Link>
                <Link href="/wallet" passHref>
                    <a>Wallet</a>
                </Link>
            </div>
        </>
    )
}
