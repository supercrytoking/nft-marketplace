import classNames from 'classnames'
import ReactTyped from 'react-typed'

export default function Button(props) {
    const { className, children, loading, type } = props
    return (
        <button {...props} type={type || 'button'} className={classNames('bg-zinc-400 text-zinc-900 px-4 py-2 relative', className)}>
            <span className={classNames(loading && 'opacity-0')}>{children}</span>
            {loading && (
                <span className="absolute mx-auto right-0 left-0">
                    <ReactTyped strings={['...']} loop />
                </span>
            )}
        </button>
    )
}
