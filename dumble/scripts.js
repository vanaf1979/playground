import React, {useEffect, useRef} from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import gsap from "https://cdn.skypack.dev/gsap@3.9.1";


const Cylinder = ({className, radius, depth, resolution}) => {

    const sideWidth = (radius * 3.5) / parseInt(resolution);
    const rotation = 360 / resolution;

    const makeIndex = (i) => {
        return i < (parseInt(resolution) / 2) ? i + 1 : parseInt(resolution) + (i * -1);
    }

    return (
        <div
            className={"cylinder " + className}
            style={{
                "--radius": radius,
                '--depth': depth
            }}>

            <div className="top"/>

            {Array(parseInt(resolution)).fill(null).map((ell, i) => {
                return <div
                    key={i}
                    className="side"
                    style={{
                        '--width': sideWidth,
                        '--height': depth,
                        '--rotate': (rotation * i),
                        '--index': makeIndex(i)
                    }}
                />
            })}

            <div className="bottom"/>

        </div>
    )
}

const App = (props) => {
    const stage = useRef({});

    useEffect(() => {
        document.addEventListener('pointermove', (pos) => {

            const {mapRange} = gsap.utils;

            let x = mapRange(
                0, window.innerWidth,
                -75, -105,
                pos.clientX
            );

            let y = mapRange(
                0, window.innerHeight,
                -5, -15,
                pos.clientY
            );

            gsap.set(stage.current, {
                '--rotate-x': y + 'deg'
            })

            gsap.set(stage.current, {
                '--rotate-y': x + 'deg'
            })

        });
    }, [])

    return (
        <div className="stage" ref={stage}>
            <Cylinder className="weight_big_left" radius="30" depth="5" resolution="40"/>
            <Cylinder className="weight_small_left" radius="20" depth="5" resolution="40"/>
            <Cylinder className="weight_big_right" radius="30" depth="5" resolution="40"/>
            <Cylinder className="weight_small_right" radius="20" depth="5" resolution="40"/>
            <div className="shadow_left"/>
            <div className="shadow_right"/>
            <Cylinder className="bar" radius="6" depth="60" resolution="40"/>
            <Cylinder className="lock_left" radius="2" depth="9" resolution="20"/>
            <Cylinder className="lock_right" radius="2" depth="9" resolution="20"/>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);