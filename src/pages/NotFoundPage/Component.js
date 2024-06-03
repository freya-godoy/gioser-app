import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
    Col,
    Container,
    Button,
    Media,
    Row
} from 'reactstrap';

import get from 'lodash/get';

import notFoundImage from 'images/notFound.svg';

const NotFoundPage = ({i18n}) => (
    <Container className="my-auto not-background not-found-container">
        <Row>
            <Col className="not-found-container--content">
                <Media
                    className="img-fluid mt-4 mx-auto"
                    alt="logo-app"
                    src={notFoundImage}
                />
                <h2 className="title-page text-center">{i18n.titleNotFoundPage}</h2>
                <h6 className="description-page text-center">{i18n.descriptionNotFoundPage}</h6>
            </Col>
        </Row>
        <Row >
            <Col className="text-center">
                <Button tag={Link} to="/" color="primary">
                    {get(i18n, 'buttonNotFoundPage')}
                </Button>
            </Col>
        </Row>
    </Container>
);

NotFoundPage.propTypes = {
    i18n: PropTypes.shape({
        titleNotFoundPage: PropTypes.string,
        buttonNotFoundPage: PropTypes.string,
        descriptionNotFoundPage: PropTypes.string
    }).isRequired
};

export default NotFoundPage;
