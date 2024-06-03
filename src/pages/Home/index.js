import React from 'react';
import logo from '@images/OKLAHOMA-V1-2.png';
import {Row, Col} from 'reactstrap';

const Home = () => (
    <Row className="m-0 w-100 p-4 m-4">
        <Col md={12} className="p-4">
            <img className="p-4" width="100%" src={logo} alt="logo"/>
        </Col>
    </Row>
);

export default Home;
