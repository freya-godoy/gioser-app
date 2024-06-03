import React from 'react';
import {Row, Col, Container} from 'reactstrap';
import {useSelector} from 'react-redux';
import fromState from '@selectors';

import get from 'lodash/get';
import includes from 'lodash/includes';

const Footer = () => {
    const {hash} = useSelector(fromState.Common.getRouter);
    const i18n = useSelector(fromState.Session.getI18N);

    if (!includes(hash, 'login')) {
        return (
            <footer className="top-more">
                <Container fluid>
                    <Row className="my-4">
                        <Col sm={{
                            offset: 4, size: 4
                        }}
                        >
                            <p className="text-white text-center mt-1">
                                {get(i18n, 'footerContent')}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
    return null;
};
export default Footer;
