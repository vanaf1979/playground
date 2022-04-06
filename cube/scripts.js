import React, {useEffect, useRef} from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import gsap from "https://cdn.skypack.dev/gsap@3.9.1";
import {throttle} from "https://cdn.skypack.dev/lodash@4.17.21";

const Cube = ({className, x, y, z}) => {
    return (
        <div className={"cube " + className} style={{'--x': x, '--y': y, '--z': z}}>
            <div className="top"/>
            <div className="side"/>
            <div className="side"/>
            <div className="side"/>
            <div className="side"/>
            <div className="bottom"/>
        </div>
    )
}

const App = (props) => {
    const stage = useRef({});

    const paralax = () => {

    }

    useEffect(() => {
        document.addEventListener('pointermove', throttle((pos) => {
            const {mapRange} = gsap.utils;

            let x = mapRange(
                0, window.innerWidth,
                -55, -125,
                pos.clientX
            );

            let y = mapRange(
                0, window.innerHeight,
                25, -25,
                pos.clientY
            );

            gsap.set(stage.current, {
                '--rotate-x': Math.floor(y) + 'deg'
            })

            gsap.set(stage.current, {
                '--rotate-y': Math.floor(x) + 'deg'
            })

        }, 10));
    }, [])

    return (
        <div className="stage" ref={stage}>
            <Cube className="floor" x='60' y='60' z='1'/>
            <Cube className="wall" x='60' y='1' z='40'/>
            <Cube className="wall-two" x='1' y='60' z='40'/>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);