import React, {useState} from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import size from 'lodash/size';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

const Sliders = ({items}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const itemsSize = size(items);
    const next = () => {
        if (animating) { return; }
        const nextIndex = activeIndex === itemsSize - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) { return; }
        const nextIndex = activeIndex === 0 ? itemsSize - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = newIndex => {
        if (animating) { return; }
        setActiveIndex(newIndex);
    };

    const slides = map(items, item => (
        <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.src}
            height="100%"
        >
            <img src={item.src} alt={item.altText} style={{height: '100%'}}/>
            <CarouselCaption captionText={item.caption} captionHeader={item.caption}/>
        </CarouselItem>
    ));

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            style={{height: '100%'}}
            id="aca-estas-mierda-"
        >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex}/>
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous}/>
            <CarouselControl direction="next" directionText="Next" onClickHandler={next}/>
        </Carousel>
    );
};

Sliders.propTypes = {items: PropTypes.shape({}).isRequired};

export default Sliders;
