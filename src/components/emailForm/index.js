import React from 'react';
import {
    Form, FormGroup, Input, Row, Col, Button
} from 'reactstrap';

const EmailForm = () => (
    <Form className="top text-left">
        <Row>
            <Col sm="2"/>
            <Col sm="5" className="red-color">
                <strong>Enviar mail</strong>
            </Col>
            <Col sm="3">
                <Button color="warning" size="sm">
                    Enviar Mail
                </Button>
            </Col>
            <Col sm="2"/>
        </Row>
        <Row className="top">
            <Col sm="2"/>
            <Col sm="8">
                <Row>
                    <Col sm="12">
                        <FormGroup>
                            <p>Asunto</p>
                            <Input
                                type="text"
                                placeholder="Escribe un titulo"
                                name="asunto"
                            />
                            <br/>
                        </FormGroup>
                    </Col>
                    <Col sm="12">
                        <FormGroup>
                            <p>Mensaje</p>
                            <Input
                                type="textarea"
                                placeholder="Escriba un mensaje"
                                name="mensaje"
                            />
                            <br/>
                        </FormGroup>
                    </Col>
                </Row>
            </Col>
            <Col sm="2"/>
        </Row>
    </Form>
);

export default EmailForm;
