import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Container, Row, Col, Button} from 'reactstrap';
import classnames from 'classnames';
import logo from '@images/OKLAHOMA-V1-2.png';
import fromState from '@selectors';
import {addProductToBasket, deleteProductToBasket} from '@core/state/Order/actions';
import productActions from '@core/state/Product/actions';
import Carousel from '@components/Carousel';
import ProductDetail from '@components/ProductDetail';
import Modal from '@components/Modal';
import {getRoutes} from '@helpers';
import {setModalData} from '@core/state/Session/actions';
import get from 'lodash/get';
import noop from 'lodash/noop';
import {Typography} from '@mui/material';

const {fetchProductsRequested} = productActions;
const routes = getRoutes('order');

const OrderView = () => {
    const dispatch = useDispatch();
    const productListProps = useSelector(fromState.Product.getListProps);
    const modalData = useSelector(fromState.Session.getModalData);
    const orderListProps = useSelector(fromState.Order.getListProps);

    const handleCloseModal = () => {
        dispatch(setModalData({
            children: null,
            onAddProduct: noop,
            leftLabel: '',
            rightLabel: '',
            open: false
        }));
    };

    useEffect(() => {
        document.documentElement.webkitRequestFullscreen();
        dispatch(fetchProductsRequested());
        return () => handleCloseModal();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]);

    const handleAddProduct = product => {
        dispatch(addProductToBasket({
            product
        }));
    };

    const handleRemoveProduct = product => {
        dispatch(deleteProductToBasket({
            product
        }));
    };

    const handleViewDetails = product => {
        dispatch(setModalData({
            open: true,
            children: (
                <ProductDetail
                    product={product}
                    handleRemoveProduct={handleRemoveProduct}
                    handleCloseModal={handleCloseModal}
                    currentQuantity={get(orderListProps, `basket.${product._id}.quantity`)}
                    handleAddProduct={handleAddProduct}
                />
            ),
            title: product.name,
            onAddProduct: () => handleAddProduct(product),
            leftLabel: 'Cancel',
            rightLabel: 'Confirm'
        }));
    };

    return (
        <Container
            fluid
            className={classnames('border-shadow, view-container', 'p-0')}
        >
            <Row className="m-0 w-100">
                <Col md={8}>
                    <h4 className="subtitle shine-animation p-2">
                        Que burger disfrutarás hoy ?
                    </h4>
                </Col>
                <Col md={4} xs={4} className="m-0 pt-2 pr-2 d-flex justify-content-end align-items-start">
                    <Typography className="title mr-2" fontSize={18}>
                        {orderListProps.quantity}
                        {' '}
                        x Productos
                        <br/>
                        ARS
                        {' '}
                        {orderListProps.mount}
                    </Typography>
                    <Button
                        disabled={orderListProps.quantity < 1}
                        color="warning"
                        tag={Link}
                        to={routes.resume}
                        style={{
                            height: '40px',
                            margin: 0
                        }}
                    >
                        Ver Orden
                    </Button>
                </Col>
                <Col md={12} className="p-0 d-flex flex-column justify-content-center column">
                    <h6 className="text p-4 bg-secondary">
                        Genera tu pedido y pagalo en caja.
                    </h6>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                    <h3 className="mt-4 pl-4 pr-4 mb-2">
                        <Carousel
                            items={productListProps.documents}
                            handleAddProduct={handleAddProduct}
                            handleViewDetails={handleViewDetails}
                        />
                    </h3>
                </Col>
            </Row>
            <Row className="m-0 w-100 p-4">
                <Col md={12} xs={12} className="d-flex justify-content-center align-items-center mt-4">
                    <img height={150} width={350} src={logo} alt="logo"/>
                </Col>
            </Row>
            <Modal
                {...modalData}
                toggle={() => handleCloseModal()}
            />
        </Container>
    );
};

OrderView.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired
};
export default OrderView;
