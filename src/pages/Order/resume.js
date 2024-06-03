import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import get from 'lodash/get';
import {Container, Row, Col} from 'reactstrap';
import logo from '@images/OKLAHOMA-V1-2.png';
import {getRoutes, swalConfirmAction} from '@helpers';
import fromState from '@selectors';
import orderActions, {addProductToBasket, deleteProductToBasket} from '@core/state/Order/actions';
import productActions from '@core/state/Product/actions';
import IconButton from '@mui/material/IconButton';
import map from 'lodash/map';
import ButtonsForm from '@components/ButtonsForm';
import {Typography} from '@mui/material';

const routes = getRoutes('order');
const {submitOrderRequested} = orderActions;
const {fetchProductsRequested} = productActions;

const OrderView = ({history: {push}}) => {
    const i18n = useSelector(fromState.Session.getI18N);
    const dispatch = useDispatch();
    const orderListProps = useSelector(fromState.Order.getListProps);
    const {basket, quantity} = orderListProps;

    useEffect(() => {
        if (quantity === 0) { push(routes.view); }
    }, [quantity, push]);

    useEffect(() => {
        dispatch(fetchProductsRequested());
    }, [dispatch]);

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

    const handleSubmitOrder = () => {
        dispatch(submitOrderRequested({
            fromUser: true, push
        }));
    };

    return (
        <Container
            fluid
            className={classnames('border-shadow bg-dark pt-4')}
            style={{
                height: '100vh'
            }}
        >

            <Row className="text-center m-0 w-100 pt-4">
                <Col md={12} className="d-flex justify-content-center">
                    <h3 className="title mt-1 mb-4">
                        Tu Pedido
                    </h3>
                </Col>
                <Col md={12} className="d-flex justify-content-center mt-2">
                    <div className="resume-box resume-modal-box">
                        <div className="header pl-4 pr-4">
                            Descripcion
                        </div>
                        <div className="body">
                            {map(basket, product => (
                                <>
                                    <IconButton>
                                        <Typography color="primary" variant="h4" className="subtitle text-black">
                                            {`${product.name}`}
                                        </Typography>
                                    </IconButton>
                                    <br/>

                                </>
                            ))}
                        </div>
                    </div>
                    <div className="resume-box resume-modal-box">
                        <div className="header pl-4 pr-4">
                            Cantidad
                        </div>
                        <div className="body">
                            {map(basket, product => (
                                <>
                                    <IconButton color="warning" className="icon-button-plus" onClick={() => handleRemoveProduct(product)}>
                                        -
                                    </IconButton>
                                    <IconButton>
                                        <Typography color="primary" variant="h4" className="subtitle text-black">
                                            {`${product.quantity}`}
                                        </Typography>
                                    </IconButton>

                                    <IconButton color="warning" className="icon-button-plus" onClick={() => handleAddProduct(product)}>
                                        +
                                    </IconButton>
                                    <br/>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="resume-box resume-modal-box">
                        <div className="header pl-4 pr-4">
                            Precio
                        </div>
                        <div className="body">
                            {map(basket, product => (
                                <>
                                    <IconButton>
                                        <Typography color="primary" variant="h4" className="subtitle text-black">
                                            {`$  ${product.quantity * product.price}  `}
                                        </Typography>
                                    </IconButton>
                                    <br/>
                                </>
                            ))}
                        </div>
                    </div>
                </Col>
                <Col md={12} className="d-flex flex-row-reverse bd-highlight top-more">
                    <h4 className="subtitle text-primary">
                        Total: $
                        {' '}
                        {orderListProps.mount}

                    </h4>
                </Col>
            </Row>
            <Row className="text-center m-0 w-100 pt-1">
                <Col md={12} className="d-flex justify-content-center">
                    <ButtonsForm
                        routeCancel="/order/view"
                        handleSubmit={() => swalConfirmAction(
                            'warning', 'Desea Confirmar Su Pedido?', '', get(i18n, 'confirm', 'Confirmar'), get(i18n, 'cancel'), handleSubmitOrder
                        )}
                        disabledCancel={false}
                        disabledSave={false}
                        labelSave="Finalizar"
                        labelCancel="Volver"
                    />
                </Col>
            </Row>
            <Col md={12} className="d-flex justify-content-center mt-4">
                <img className="d-flex justify-content-end" height={120} src={logo} alt="logo"/>
            </Col>
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
