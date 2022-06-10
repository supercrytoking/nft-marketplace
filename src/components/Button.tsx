import classNames from 'classnames'
import ReactTyped from 'react-typed'

export default function Button(props) {
    const { className, children, loading, type, disabled, theme } = props
    return (
        <button {...props} type={type || 'button'} className={classNames('bg-zinc-400 text-zinc-900 hover:text-zinc-400 hover:bg-zinc-900  group-hover:text-zinc-400 group-hover:bg-zinc-900 border-2 border-transparent hover:border-zinc-400 group-hover:border-zinc-400 px-4 py-2 relative', disabled && 'opacity-50 line-through pointer-events-none', className)}>
            <span className={classNames(loading && 'opacity-0')}>{children}</span>
            {loading && (
                <span className="absolute mx-auto right-0 left-0">
                    <ReactTyped strings={['...']} loop />
                </span>
            )}
        </button>
    )
}
