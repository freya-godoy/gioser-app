import React from 'react';
import PropTypes from 'prop-types';
import {
    Container, Row, Col, Button
} from 'reactstrap';

const HeaderPage = ({title, onClick, labelButton, isMobile}) => (
    <Container>
        <Row>
            <Col
                md={6}
                xs={6}
                style={{
                    cursor: 'pointer', height: '70px', marginBottom: '12px'
                }}
                className="d-flex justify-content-start align-items-center"
            >
                <h3>{title}</h3>
            </Col>
            {onClick && !isMobile && (
                <Col
                    style={{
                        cursor: 'pointer', height: '70px', marginBottom: '12px'
                    }}
                    className="d-flex justify-content-end align-items-center"
                    xs={6}
                >
                    <Button
                        onClick={onClick}
                        disabled={false}
                        color="primary"
                        size={isMobile ? 'sm' : ''}
                    >
                        {labelButton}
                    </Button>
                </Col>
            )}
        </Row>
    </Container>
);

HeaderPage.propTypes = {
    onClick: PropTypes.func.isRequired,
    labelButton: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired
};
export default HeaderPage;
