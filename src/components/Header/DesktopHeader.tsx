import commaNumber from 'comma-number'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'
import ConnectWallet from './ConnectWallet'
import links from './links'

export default function DesktopHeader() {
    return (
        <div className="hidden md:flex px-6 pt-12 max-w-7xl mx-auto  items-center space-x-4">
            {links.map((link) => (
                <Link href={link.href} passHref>
                    <a target={link.target}>{link.title}</a>
                </Link>
            ))}
            <div className="flex-1" />
            <ConnectWallet />
        </div>
    )
}
