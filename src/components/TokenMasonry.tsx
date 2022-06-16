import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import useApp from "../AppWrapper"
import ImageBox from "./ImageBox"
export default function TokenMasonry({ tokens }) {

    const { largeGrid } = useApp()

    return <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: largeGrid ? 1 : 2, 750: largeGrid ? 2 : 4, 900: largeGrid ? 3 : 5 }}
    >
        <Masonry
            gutter="1em"
        >
            {tokens.map((token) => (
                <>{token &&
                    <ImageBox nft={token} key={token._id} />
                }</>
            ))}
        </Masonry>
    </ResponsiveMasonry>
}