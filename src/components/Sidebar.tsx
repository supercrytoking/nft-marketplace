import Portal from "./Portal";

export default function SideBar({ visible, onClose, children }) {
    if (!visible) return null
    return <Portal>
        <div className="inset-0 fixed z-20" onClick={onClose}>
            <div className="h-full absolute right-0 top-0 max-w-lg w-full bg-zinc-800 border-l border-zinc-700 shadow-2xl overflow-scroll" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    </Portal>
}