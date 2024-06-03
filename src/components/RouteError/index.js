import React from 'react';
import {
    Alert,
    Row,
    Col
} from 'reactstrap';

const ErrorComponent = () => (
    <Row className="justify-content-center my-auto">
        <Col sm="6" className="text-center">
            <Alert color="danger">
                <h3>La ruta que intentas acceder no existe</h3>
            </Alert>
        </Col>
    </Row>
);

export default ErrorComponent;
