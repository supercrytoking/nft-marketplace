export default function Button(props) {
    const { children, loading, type } = props
    return (
        <button {...props} type={type || 'button'} className="bg-white w-full text-black px-4 py-2">
            <span>{children}</span>
            {/* <span className="">...</span> */}
        </button>
    )
}
