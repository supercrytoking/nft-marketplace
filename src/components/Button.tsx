import classNames from 'classnames'

export default function Button(props) {
    const { className, children, loading, type } = props
    return (
        <button {...props} type={type || 'button'} className={classNames('bg-white  text-black px-4 py-2', className)}>
            <span>{children}</span>
            {/* <span className="">...</span> */}
        </button>
    )
}
