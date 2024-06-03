import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {useSelector, useDispatch} from 'react-redux';
import {useParams, Link} from 'react-router-dom';
import {
    Row,
    Col,
    Button,
    Container
} from 'reactstrap';
import ButtonsForm from '@components/ButtonsForm';
import {FormBuilder} from '@fepp/form-builder/dist';
import orderActions, {addProductToBasket, deleteProductToBasket} from '@core/state/Order/actions';
import productActions from '@core/state/Product/actions';
import fromState from '@selectors';
import {getRoutes} from '@helpers';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import IconButton from '@mui/material/IconButton';

const routes = getRoutes('order');
const {
    fetchOrderRequested,
    clearOrderForm,
    updateOrderForm,
    submitOrderRequested
} = orderActions;

const {fetchProductsRequested} = productActions;

const OrderForm = ({history: {push}}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const newFields = useSelector(fromState.Order.getFields);
    const orderForm = useSelector(fromState.Order.getForm);
    const productListProps = useSelector(fromState.Product.getListProps);
    const orderListProps = useSelector(fromState.Order.getListProps);
    const i18n = useSelector(fromState.Session.getI18N);

    const {basket} = orderListProps;

    useEffect(() => {
        if (id) {
            dispatch(fetchOrderRequested(id));
        }
        return () => {
            dispatch(clearOrderForm());
        };
    }, [id, dispatch]);

    const handleAddProduct = product => {
        dispatch(addProductToBasket({
            product
        }));
    };

    useEffect(() => {
        if (isEmpty(productListProps.documents)) {
            dispatch(fetchProductsRequested());
        }
    }, [productListProps.documents, dispatch]);

    const handleChangeNewForm = form => {
        dispatch(updateOrderForm({
            ...form
        }));
    };

    const handleSubmitNewForm = () => {
        dispatch(submitOrderRequested({
            push, id
        }));
    };

    const handleRemoveProduct = (product, allProducts) => {
        dispatch(deleteProductToBasket({
            product, allProducts
        }));
    };

    const handleProductsInOrderForm = form => {
        handleAddProduct(form.products);
        dispatch(updateOrderForm({
            ...form
        }));
    };

    return (
        <Container
            className="p-2"
            style={{
                marginTop: '3rem'
            }}
        >
            <Row className="p-4">
                <Col md={12} xs={12}>
                    <h4>
                        {get(i18n, 'order', 'Order')}
                        <Link to={routes.list} className="float-right">
                            <Button color="warning">
                                {get(i18n, 'back', 'Volver')}
                            </Button>
                        </Link>
                    </h4>
                </Col>
                <Col className="p-0 mt-4">
                    <FormBuilder
                        form={newFields}
                        values={orderForm}
                        onChange={e => handleChangeNewForm(e)}
                    />
                    <FormBuilder
                        form={[{
                            type: 'dropdown',
                            name: 'products',
                            text: 'Products',
                            options: map(productListProps.documents, prod => ({
                                name: prod.name, _id: prod
                            }))
                        }]}
                        values={orderForm}
                        onChange={e => handleProductsInOrderForm(e)}
                    />
                    <Container>
                        {map(basket, product => (
                            <Row>
                                <Col>
                                    <IconButton
                                        color="primary"
                                        className="w-250"
                                    >
                                        {product.name}
                                    </IconButton>
                                    <IconButton
                                        disabled={get(orderListProps, `basket.${product._id}.quantity`) === 1}
                                        color="primary"
                                        onClick={() => handleRemoveProduct(get(orderListProps, `basket.${product._id}`), false)}
                                    >
                                        <RemoveCircleOutlineIcon/>
                                    </IconButton>
                                    <IconButton>
                                        {`${get(orderListProps, `basket.${product._id}.quantity`, 0)}`}
                                    </IconButton>

                                    <IconButton color="warning" onClick={() => handleAddProduct(product)}>
                                        <AddCircleOutlineIcon/>
                                    </IconButton>
                                    <IconButton className="pl-4" color="primary" onClick={() => handleRemoveProduct(product, true)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Col>
                            </Row>
                        ))}
                    </Container>
                    <Container>
                        <Row>
                            <Col md={8} xs={8}/>
                            <Col class="mt-4">
                                <IconButton className="pl-4" color="primary">
                                    TOTAL:
                                    <AttachMoneyIcon className="ml-2"/>
                                    {orderListProps.mount}
                                </IconButton>
                            </Col>
                        </Row>
                    </Container>
                    <ButtonsForm
                        handleSubmit={handleSubmitNewForm}
                        routeCancel={routes.list}
                        disabledSave={false}
                        labelSave="Guardar"
                        labelCancel="Volver"
                    />
                </Col>
            </Row>
        </Container>
    );
};

OrderForm.propTypes = {
    i18n: PropTypes.shape({
        modificationOf: PropTypes.string,
        registerOf: PropTypes.string,
        disciplinaryField: PropTypes.string,
        cancel: PropTypes.string,
        save: PropTypes.string
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default OrderForm;
