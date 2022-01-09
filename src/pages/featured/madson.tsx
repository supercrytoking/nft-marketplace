import useSWR from 'swr'
import ImageBox from '../../components/ImageBox'

export default function FeaturedPage() {
    const { data } = useSWR('/data/0x3d7071e5647251035271aeb780d832b381fa730f?to=10')

    return (
        <>
            <div className="p-6 max-w-4xl mx-auto py-12 md:py-24  space-y-12 font-sans">
                <div className="space-y-6 mb-24">
                    {/* <p className="tracking-widest uppercase font-extrabold opacity-25">Fantom Digital Presents</p> */}
                    <p className="text-4xl md:text-7xl font-extrabold">Trials and Tribulations of the Spirit</p>
                    <p className="text-xl md:text-3xl font-light">
                        Currently residing in Minas Gerais, Brazilian Artist MADSON&trade; presents his Genesis collection, Trials and Tribulations of the Spirit. Each piece expresses reprehenderit et adipisicing quis
                        aliquip ut officia eiusmod. Elit do do sit id pariatur laboris do. Ullamco consectetur cupidatat nostrud dolore consequat consectetur ipsum nulla fugiat mollit. Anim officia magna exercitation
                        nulla elit nulla elit sit.
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs md:text-base">
                        <p className="bg-white text-black px-4 py-2 rounded font-mono inline-block whitespace-nowrap">Limited Release</p>
                        <p className="bg-white text-black px-4 py-2 rounded font-mono inline-block whitespace-nowrap">25 Pieces</p>
                        <p className="bg-white text-black px-4 py-2 rounded font-mono inline-block whitespace-nowrap">Genesis Collection</p>
                    </div>
                </div>

                {data && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {data.map((nft) => (
                            <ImageBox nft={nft} key={nft.id} />
                        ))}
                    </div>
                )}

                {/* <div className="grid grid-col-1 md:grid-cols-2 gap-6"> */}
                <div className="space-y-6">
                    <p className="text-xl">
                        Incididunt laborum ipsum tempor ex nostrud qui in commodo est. Fugiat in id in irure consectetur laborum enim officia sint ex proident sit sunt. Amet nisi et adipisicing enim aliqua consequat
                        eiusmod cillum nostrud. Tempor occaecat dolor sunt Lorem enim cupidatat laboris cillum anim officia. Elit proident fugiat non cupidatat dolore consequat occaecat occaecat eu duis adipisicing ut
                        ipsum esse.
                    </p>
                    <p className="text-xl">
                        Reprehenderit nostrud commodo duis dolor eu voluptate duis reprehenderit voluptate labore culpa minim. Est minim ullamco duis eiusmod consectetur minim. Amet sint nostrud non qui nulla. Duis duis
                        nulla cillum incididunt in aliqua cupidatat eu non proident dolore do qui Lorem. Do et pariatur laboris labore occaecat ipsum quis aliqua ipsum exercitation. Est exercitation velit voluptate sunt
                        nulla.
                    </p>
                </div>
            </div>
        </>
    )
}
