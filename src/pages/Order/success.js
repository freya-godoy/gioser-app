import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Container, Row, Col, Button} from 'reactstrap';
import orderActions from '@core/state/Order/actions';
import productActions from '@core/state/Product/actions';
import {Link} from 'react-router-dom';
import {getRoutes} from '@helpers';
import logo from '@images/OKLAHOMA-V1-2.png';

const {clearOrderForm} = orderActions;
const routes = getRoutes('order');

const {fetchProductsRequested} = productActions;

const OrderView = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductsRequested());
        return () => dispatch(clearOrderForm());
    }, [dispatch]);

    return (
        <Container
            fluid
            className={classnames('border-shadow bg-dark')}
        >
            <Row >
                <Col
                    md={12}
                    className="d-flex flex-column align-items-center justify-content-center"
                    style={{
                        height: '100vh'
                    }}
                >
                    <img className="d-flex justify-content-end" height={120} src={logo} alt="logo"/>
                    <h5 className="w-100 mt-4 title text-center">
                        Muchas Gracias por tu Compra, ya puedes pasar a abonarlo por caja.
                    </h5>
                    <Button
                        tag={Link}
                        to={routes.resume}
                        color="warning"
                        className="w-100 mt-4"
                    >
                        Realizar un nuevo Pedido
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

OrderView.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired,
    location: PropTypes.shape({
        search: PropTypes.string,
        pathname: PropTypes.string
    }).isRequired
};
export default OrderView;
