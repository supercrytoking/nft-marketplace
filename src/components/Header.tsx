import Link from 'next/link'

export default function Header() {
    return (
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
    )
}
