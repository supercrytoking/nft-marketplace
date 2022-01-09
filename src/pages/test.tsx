import dynamic from 'next/dynamic'

const ContractFactory = dynamic(() => import('../components/ContractFactory'), { ssr: false })

export default function Test() {
    return <ContractFactory />
}
