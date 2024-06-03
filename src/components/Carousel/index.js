import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import map from 'lodash/map';
import VerticalCards from '@components/Cards/verticalCard';
import {isMobile} from 'react-device-detect';

const Carousel = ({items, slidesToShow, slidesToScroll, speed, handleAddProduct, handleViewDetails}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed,
        slidesToShow,
        slidesToScroll
    };

    return (
        <Slider {...settings}>
            {map(items, item => (
                <div>
                    <VerticalCards
                        item={item}
                        cols={isMobile ? 12 : 3}
                        handleAddProduct={handleAddProduct}
                        handleViewDetails={handleViewDetails}
                    />
                </div>
            ))}
        </Slider>
    );
};

Carousel.propTypes = {
    items: PropTypes.arrayOf({
    }).isRequired,
    slidesToShow: PropTypes.number,
    slidesToScroll: PropTypes.number,
    speed: PropTypes.number,
    handleViewDetails: PropTypes.func.isRequired,
    location: PropTypes.shape({
        search: PropTypes.string,
        pathname: PropTypes.string
    }).isRequired,
    handleAddProduct: PropTypes.func.isRequired
};

Carousel.defaultProps = {
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500
};

export default Carousel;
