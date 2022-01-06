export default function Textarea(props) {
    const { label } = props
    return (
        <div className="w-full">
            {label && <p className="mb-1 text-xs">{label}</p>}
            <textarea {...props} className="w-full bg-white text-black p-2 h-32" />
        </div>
    )
}
