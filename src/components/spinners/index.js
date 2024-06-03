import React from 'react';
import PropTypes from 'prop-types';
import {
    Spinner, Row, Col
} from 'reactstrap';

const Spinners = props => {
    const {width, height, color} = props;
    return (
        <Row>
            <Col className="text-center mt-5">
                <Spinner
                    style={{
                        width: `${width}`, height: `${height}`
                    }}
                    color={color}
                />
            </Col>
        </Row>
    );
};

Spinners.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};
export default Spinners;
