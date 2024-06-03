import React, {useRef} from 'react';

const ErrorPage = () => {
    const leftEye = useRef(null);
    const rightEye = useRef(null);
    const handleMousemove = event => {
        const eyeLeft = leftEye.current;
        const eyeRight = rightEye.current;

        const x = (eyeLeft.offsetLeft) + (eyeLeft.offsetWidth / 2);
        const y = (eyeLeft.offsetTop) + (eyeLeft.offsetHeight / 2);

        const rad = Math.atan2(event.pageX - x, event.pageY - y);
        const rot = (rad * (180 / Math.PI) * -1) + 180;
        eyeLeft.style['-webkit-transform'] = `rotate(${rot}deg)`;
        eyeLeft.style.transform = `rotate(${rot}deg)`;
        eyeRight.style['-webkit-transform'] = `rotate(${rot}deg)`;
        eyeRight.style.transform = `rotate(${rot}deg)`;
    };

    return (
        <div className="error-page" onMouseMove={handleMousemove}>
            <div className="full-screen">
                <div className="error-container">
                    <h1>Error</h1>
                    <span className="error-num">5</span>
                    <div className="eye" ref={leftEye}/>
                    <div className="eye" ref={rightEye}/>
                    <h3 className="sub-text my-5">
                        Algo salio mal. Estamos
                        &nbsp;
                        <u className="italic">buscando</u>
                        &nbsp;
                        para ver que paso.
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
