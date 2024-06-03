import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import map from 'lodash/map';
import {Container, Row, Col} from 'reactstrap';

const OrderDetailTicket = ({order}) => (
    <Container
        fluid
        className={classnames('border-shadow')}
    >
        <Row className="text-center m-0 w-100 pt-1">
            <Col md={12} className="d-flex justify-content-center">
                <h3 className="font-shoulders mt-1 mb-4">
                    Pedido
                </h3>
            </Col>
            <Col md={12} className="justify-content-center">
                <h4 className="font-shoulders">
                    Estado:
                    {' '}
                    {order.status}
                </h4>
                <br/>
                <h4 className="font-shoulders">
                    Fecha:
                    {' '}
                    {order.updatedAt}
                </h4>
                <br/>
                <h3 className="font-shoulders">
                    $
                    {' '}
                    {order.total}
                </h3>
                {' '}
                <br/>
                {map(order.basket, product => (
                    <h3 className="font-chantal p-2">{`${product.name}: ${product.quantity}`}</h3>
                ))}
            </Col>
        </Row>
    </Container>
);

OrderDetailTicket.propTypes = {
    order: PropTypes.shape({
        status: PropTypes.string,
        updatedAt: PropTypes.string,
        total: PropTypes.number,
        basket: PropTypes.shape({
        })
    }).isRequired
};
export default OrderDetailTicket;
