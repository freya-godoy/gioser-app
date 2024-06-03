import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {
    Row,
    Col,
    Button,
    Container
} from 'reactstrap';
import get from 'lodash/get';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import TableList from '@components/TableList';
import Modal from '@components/Modal';
import fromState from '@selectors';
import orderActions from '@core/state/Order/actions';
import {swalConfirmAction, getRoutes} from '@helpers';
import replace from 'lodash/replace';
import orderBy from 'lodash/orderBy';
import cloneDeep from 'lodash/cloneDeep';
import Searcher from '@components/Searcher';
import {setModalData} from '@core/state/Session/actions';
import NumberIdForm from './detailToPrint';
import ViewToPrint from './viewToPrint';

const {
    fetchOrderRequested,
    fetchOrdersRequested,
    deleteOrderRequested,
    submitOrderRequested,
    updateOrderForm,
    setNewPage
} = orderActions;

const routes = getRoutes('order');

const OrderList = ({history: {push}}) => {
    const dispatch = useDispatch();
    const [term, setTerm] = useState('');
    const orderListProps = useSelector(fromState.Order.getListProps);
    const i18n = useSelector(fromState.Session.getI18N);
    const table = useSelector(fromState.Order.getTable);
    const modalData = useSelector(fromState.Session.getModalData);
    const fetchOrderList = () => {
        dispatch(fetchOrdersRequested());
    };

    useEffect(() => {
        const fetchOrderList = () => {
            dispatch(fetchOrdersRequested());
        };
        fetchOrderList();
    }, [dispatch]);

    const onDelete = prop => {
        const {_id} = prop;
        const deleteField = () => {
            dispatch(deleteOrderRequested(_id));
        };
        swalConfirmAction(
            // eslint-disable-next-line comma-spacing, max-len
            'warning', get(i18n, 'deleteRegister', 'Desea Eliminar'), '',get(i18n, 'confirm', 'eliminar'), get(i18n, 'cancel', 'cancelar'), deleteField
        );
    };

    const handleChangePage = page => {
        const nextPage = (page - 1);
        setNewPage({
            nextPage
        });
        dispatch(fetchOrderRequested());
    };

    const handleClickEdit = pub => {
        push(replace(routes.edit, ':id', pub._id));
    };

    const handleClickView = pub => {
        push(replace(routes.view, ':id', pub._id));
    };

    const handleCloseModal = () => {
        dispatch(setModalData({
            children: null,
            onAddProduct: noop,
            leftLabel: '',
            rightLabel: '',
            open: false
        }));
    };

    const handleClickAdd = order => {
        // eslint-disable-next-line no-param-reassign
        delete order._id;
        dispatch(updateOrderForm({
            ...order
        }));
        push(routes.form);
    };

    const onClickDone = prop => {
        const {_id} = prop;
        const updateOrder = () => {
            dispatch(submitOrderRequested({
                push,
                id: _id,
                updateOrder: {
                    ...updateOrder,
                    status: 'done'
                }
            }));
        };
        swalConfirmAction(
            // eslint-disable-next-line comma-spacing, max-len
            'warning', get(i18n, 'deleteRegister', 'Desea Cerrar el Pedido'), '',get(i18n, 'confirm', 'Cerrar Pedido'), get(i18n, 'cancel', 'Cancelar'), updateOrder
        );
    };

    const handleClickUpdate = (numberId, notes, order, id) => {
        const updateOrder = cloneDeep(order);
        dispatch(submitOrderRequested({
            push,
            id,
            updateOrder: {
                ...updateOrder,
                status: 'process',
                numberId: +numberId,
                notes
            }
        }));
        fetchOrderList();
    };

    const onClickSend = order => {
        dispatch(setModalData({
            open: true,
            children: (
                <NumberIdForm order={order} handleCloseModal={handleCloseModal} handleClickPrint={handleClickUpdate}/>
            ),
            title: order.name
        }));
    };

    const onClickView = order => {
        dispatch(setModalData({
            open: true,
            children: (
                <ViewToPrint handleCloseModal={handleCloseModal} order={order}/>
            ),
            title: order.name
        }));
    };

    const onClickButton = document => {
        switch (document.status) {
            case 'process':
                return onClickDone(document);
            case 'pending':
                return onClickSend(document);
            case 'done':
                return onClickView(document);
            default:
                return false;
        }
    };

    return (
        <Container className="pt-4 padding-start">
            <Row className="pt-4">
                <Col>
                    <h4>
                        {`${get(i18n, 'adminOrders', 'Administrar Pedidos')}: ${orderListProps.resultsCount}`}

                        <Link to={routes.form} className="float-right">
                            <Button color="warning">
                                {get(i18n, 'new', 'Nuevo Pedido')}
                            </Button>
                        </Link>
                        <Button onClick={() => fetchOrderList()} color="warning" className="float-right">
                            {get(i18n, 'updated', 'Actualizar')}
                        </Button>
                    </h4>
                </Col>
            </Row>
            <Row className="pt-4">
                <Col className="p-4">
                    <Row className="p-0">
                        <Col className="mb-4">
                            <Searcher
                                onSearch={() => noop()}
                                i18n={i18n}
                                setFilter={setTerm}
                                values={[]}
                                withoutTitle
                                autoFocus
                            />
                        </Col>
                    </Row>
                    <TableList
                        documents={
                            isEmpty(term)
                                ? orderBy(get(orderListProps, 'documents'), ['updatedAt'], ['desc'])
                                : orderBy(filter(get(orderListProps, 'documents'), orders => (
                                    includes(orders.id, term) || includes(orders.detail, term) || includes(orders.status, term))
                                ), ['updatedAt'], ['desc'])
                        }
                        onDelete={onDelete}
                        onView={handleClickView}
                        onSearch={handleClickView}
                        onClickButton={onClickButton}
                        onEdit={handleClickEdit}
                        handleChangePage={handleChangePage}
                        onAdd={handleClickAdd}
                        {...table}
                    />
                </Col>
            </Row>
            <Modal
                {...modalData}
                toggle={() => handleCloseModal()}
            />
        </Container>
    );
};

OrderList.propTypes = {
    orderListProps: PropTypes.shape({
    }).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            tab: PropTypes.string
        })
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired,
    location: PropTypes.shape({
        search: PropTypes.string,
        pathname: PropTypes.string
    }).isRequired,
    i18n: PropTypes.shape({
    }).isRequired
};

export default OrderList;
