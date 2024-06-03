import React from 'react';
import PropTypes from 'prop-types';
import image from 'images/emptyEntities.svg';
import {Row, Col} from 'reactstrap';

const EmptySearch = ({title, subtitle, text, isMobile}) => (
    <Row className="mt-4">
        <Col className="d-flex flex-column justify-content-center align-items-center">
            <h4 className="text-primary text-bold">{title}</h4>
            <h4 className="m-2 text-primary text-bold">{subtitle}</h4>
            <h4 className="m-2 text-primary text-bold">{text}</h4>
            <div>
                <img className="m-4" width={isMobile ? 150 : 250} height={isMobile ? 150 : 250} alt="empty-search" src={image}/>
            </div>
        </Col>
    </Row>
);

EmptySearch.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    text: PropTypes.string,
    isMobile: PropTypes.bool.isRequired
};

EmptySearch.defaultProps = {
    title: 'No se Encontraron Resultados', subtitle: '', text: ''
};

export default EmptySearch;
