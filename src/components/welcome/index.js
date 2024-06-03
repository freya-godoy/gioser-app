import React from 'react';
import {
    Row, Container, Col
} from 'reactstrap';
import confucioTxtHeader from 'images/confucioTxtHeader.png';
import image from 'images/image.svg';

const Welcome = () => (
    <Container>
        <Row className="welcome">
            <Col sm="6">
                <div>
                    &nbsp;
                    <img alt="as" src={confucioTxtHeader} className="welcome-img"/>
                </div>
            </Col>
            <Col sm="6">
                <img src={image} alt="Todos trabajando" className="welcome-img"/>
            </Col>
        </Row>
    </Container>
);

export default Welcome;
