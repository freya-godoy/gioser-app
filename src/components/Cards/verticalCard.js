/* eslint-disable lodash/prefer-lodash-method */
import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import {
    Container, Row, Col
} from 'reactstrap';
import {isMobile} from 'react-device-detect';
import classNames from 'classnames';
import {getImage} from 'helpers/index';


const VerticalCards = ({item, handleAddProduct, handleViewDetails}) => {
    return (
        <Container
            className={classNames({
                'p-0': !isMobile
            })}
            style={{
                background: 'transparent'
            }}
        >
            <Row
                onClick={() => handleViewDetails(item)}
                className={classNames({
                    'm-1': !isMobile
                }, 'user-card pointer accordion')}
            >
                <Col md={12} className="p-0">
                    <img
                    // eslint-disable-next-line max-len
                        src={getImage(item.coverImage)}
                        alt="..."
                        height={250}
                        width={200}
                        className="w-100 round-border"
                    />
                </Col>
                <Col md={12}>
                    <h6 className="text-center description">{get(item, 'name')}</h6>
                </Col>
            </Row>
        </Container>
    );
};

VerticalCards.propTypes = {
    handleAddProduct: PropTypes.func.isRequired,
    handleViewDetails: PropTypes.func.isRequired,
    item: PropTypes.shape({
        coverImage: PropTypes.string
    }).isRequired

};
export default VerticalCards;
