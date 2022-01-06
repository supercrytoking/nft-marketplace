import Portal from './Portal'

export default function Modal({ visible, onClose, children }) {
    if (!visible) return null
    return (
        <Portal>
            <div className="fixed z-50 inset-0 flex md:items-center justify-center bg-black bg-opacity-90 p-6" onClick={() => onClose()}>
                <div className="bg-black border border-zinc-900 max-w-lg w-full rounded p-6 overflow-auto" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </Portal>
    )
}
