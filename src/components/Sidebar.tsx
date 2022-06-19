import Portal from "./Portal";

export default function SideBar({ visible, onClose, children }) {
    if (!visible) return null
    return <Portal>
        <div className="inset-0 bg-black bg-opacity-50 fixed flex items-end justify-end z-20" onClick={onClose}>
            <div className="max-w-lg w-full bg-zinc-800 border-l border-zinc-700 shadow-2xl h-5/6 md:h-full overflow-auto" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    </Portal>
}