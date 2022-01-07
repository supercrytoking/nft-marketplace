import dynamic from 'next/dynamic'

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false
})
interface ComponentProps {
    // Your component props
}

const CoolStuff: React.FC<ComponentProps> = (props: ComponentProps) => {
    let angle = 0

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(canvasParentRef.clientWidth, canvasParentRef.clientHeight, p5.WEBGL).parent(canvasParentRef)
    }

    const draw = (p5: p5Types) => {
        p5.background('rgba(255,255,255,0.0000)')
        p5.translate(p5.map(p5.mouseX, 0, p5.windowWidth, -500, 500), p5.map(p5.mouseY, 0, p5.windowHeight, -100, 100))
        // p5.normalMaterial()

        p5.sphere(100, 10)

        angle += 0.017
    }

    return <Sketch className="absolute inset-0 w-full h-full" setup={setup} draw={draw} />
}

export default CoolStuff
