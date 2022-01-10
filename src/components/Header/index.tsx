import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

export default function Header() {
    return (
        <>
            <div className="bg-blue-500 text-white">
                <div className="px-6 py-2 max-w-7xl mx-auto flex items-center space-x-4">
                    <p className="text-xs">Notice: This software is in beta and may be buggy. Use at your own risk.</p>
                </div>
            </div>

            <DesktopHeader />
            <MobileHeader />
        </>
    )
}
