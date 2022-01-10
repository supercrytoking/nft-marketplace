import Link from 'next/link'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import Button from '../Button'
import Portal from '../Portal'
import links from './links'

export default function MobileHeader() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (!isOpen) return
        const handleRouteChange = () => setIsOpen(false)
        Router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            Router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [isOpen])

    return (
        <>
            {isOpen && (
                <Portal>
                    <div className="flex md:hidden fixed z-50 inset-0 bg-black text-white p-12 flex-col">
                        <div className="flex justify-end">
                            <button onClick={() => setIsOpen((_) => !_)} type="button" className="button opacity-50 hover:opacity-100 active:opacity-100">
                                <i className="fas fa-times" />
                            </button>
                        </div>
                        <div className="flex-1" />
                        <div className="flex flex-col max-w-md w-full items-end">
                            {links.map((link) => (
                                <Link href={link.href} passHref>
                                    <a className="block text-2xl">{link.title}</a>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Portal>
            )}

            <div className="block md:hidden p-6">
                <div className="flex justify-end">
                    <Button onClick={() => setIsOpen((_) => !_)}>
                        <span className="mr-2">
                            <i className="fas fa-bars" />
                        </span>
                        <span>Menu</span>
                    </Button>
                </div>
            </div>
        </>
    )
}
