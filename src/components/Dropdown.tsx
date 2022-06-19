import classNames from 'classnames'

export default function Dropdown(props) {
    const { className, children, loading, type, disabled, theme, onChange, options } = props
    return (
        <div>
            <select onChange={onChange} className={classNames('bg-zinc-400 text-zinc-900 hover:text-zinc-400 hover:bg-zinc-900  group-hover:text-zinc-400 group-hover:bg-zinc-900 border-2 border-transparent hover:border-zinc-400 group-hover:border-zinc-400 px-4 py-2 text-center relative', disabled && 'opacity-50 line-through pointer-events-none', className)}>
                <option disabled selected>Sort by...</option>
                {options.map(({ name, value }, index) => {
                    return <option value={value}>{name}</option>
                })}
            </select>
        </div>
    )
}
