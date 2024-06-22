import React, { useState, useRef, useEffect } from 'react';
import logo1 from '../assets/logo/logo1.svg';
import './Slider.css';
import logo2 from '../assets/logo/logo2.svg';
import logo3 from '../assets/logo/logo3.svg';
import logo4 from '../assets/logo/logo4.svg';
import logo5 from '../assets/logo/logo5.svg';

const Slider = () => {
    const [scrollAmount, setScrollAmount] = useState(0);
    const sliderWrapper = useRef(null);

    const scrollLeft = () => {
        setScrollAmount(prev => prev + window.innerWidth / 5);
    };

    const scrollRight = () => {
        setScrollAmount(prev => prev - window.innerWidth / 5);
    };

    useEffect(() => {
        if (sliderWrapper.current) {
            sliderWrapper.current.style.transform = `translateX(${scrollAmount}px)`;
        }
    }, [scrollAmount]);

    return (
        <div>
            <div className="slider">
                <button className="slide-arrow prev-arrow" onClick={scrollLeft}>&lt;</button>
                <div className="slider-wrapper" ref={sliderWrapper}>
                    <img src={logo1} alt="Logo 1" />
                    <img src={logo2} alt="Logo 2" />
                    <img src={logo3} alt="Logo 3" />
                    <img src={logo4} alt="Logo 4" />
                    <img src={logo5} alt="Logo 5" />
                    <img src={logo1} alt="Logo 1" />
                    <img src={logo2} alt="Logo 2" />
                    <img src={logo3} alt="Logo 3" />
                    <img src={logo4} alt="Logo 4" />
                    <img src={logo5} alt="Logo 5" />
                </div>
                <button className="slide-arrow next-arrow" onClick={scrollRight}>&gt;</button>
            </div>
        </div>
    );
};

export default Slider;
