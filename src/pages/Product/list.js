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
import fromState from '@selectors';
import productActions from '@core/state/Product/actions';
import {swalConfirmAction, getRoutes} from '@helpers';
import replace from 'lodash/replace';
import Searcher from '@components/Searcher';

const {
    fetchProductRequested,
    fetchProductsRequested,
    deleteProductRequested,
    updateProductForm,
    setNewPage
} = productActions;

const routes = getRoutes('product');

const ProductList = ({history: {push}}) => {
    const dispatch = useDispatch();
    const [term, setTerm] = useState('');
    const productListProps = useSelector(fromState.Product.getListProps);
    const i18n = useSelector(fromState.Session.getI18N);
    const table = useSelector(fromState.Product.getTable);

    useEffect(() => {
        dispatch(fetchProductsRequested());
    }, [dispatch]);

    const onDelete = prop => {
        const {_id} = prop;
        const deleteField = () => {
            dispatch(deleteProductRequested(_id));
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
        dispatch(fetchProductRequested());
    };

    const handleClickEdit = pub => {
        push(replace(routes.edit, ':id', pub._id));
    };

    const handleClickView = pub => {
        push(replace(routes.view, ':id', pub._id));
    };

    const handleClickAdd = product => {
        // eslint-disable-next-line no-param-reassign
        delete product._id;
        dispatch(updateProductForm({
            ...product
        }));
        push(routes.form);
    };

    return (
        <Container className="pt-4 padding-start">
            <Row className="pt-4">
                <Col>
                    <h4>
                        {`${get(i18n, 'adminProducts', 'Administrar Productos')}: ${productListProps.resultsCount}`}
                        <Link to={routes.form} className="float-right">
                            <Button color="warning">
                                {get(i18n, 'new', 'Nuevo Producto')}
                            </Button>
                        </Link>
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
                                ? get(productListProps, 'documents')
                                : filter(get(productListProps, 'documents'), products => (
                                    includes(products.type, term) || includes(products.name, term) || includes(products.description, term))
                                )
                        }
                        onDelete={onDelete}
                        onView={handleClickView}
                        onSearch={handleClickView}
                        onEdit={handleClickEdit}
                        handleChangePage={handleChangePage}
                        onAdd={handleClickAdd}
                        {...table}
                    />
                </Col>
            </Row>
        </Container>
    );
};

ProductList.propTypes = {
    productListProps: PropTypes.shape({
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

export default ProductList;
