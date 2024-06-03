/* eslint-disable lodash/prefer-lodash-method */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
    Row,
    Col,
    Button,
    Container
} from 'reactstrap';
import ButtonsForm from '@components/ButtonsForm';
import { FormBuilder } from '@fepp/form-builder/dist';
import productActions from '@core/state/Product/actions';
import fromState from '@selectors';
import { getRoutes } from '@helpers';
import get from 'lodash/get';

const routes = getRoutes('product');
const {
    fetchProductRequested,
    clearProductForm,
    updateProductForm,
    submitProductRequested
} = productActions;

const ProductForm = ({ history: { push } }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const newFields = useSelector(fromState.Product.getFields);
    const newForm = useSelector(fromState.Product.getForm);
    const i18n = useSelector(fromState.Session.getI18N);
    useEffect(() => {
        if (id) {
            dispatch(fetchProductRequested(id));
        }
        return () => {
            dispatch(clearProductForm());
        };
    }, [id]);

    const handleChangeNewForm = form => {
        dispatch(updateProductForm({
            ...form
        }));
    };

    const handleSubmitNewForm = () => {
        dispatch(submitProductRequested({
            push, id
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
                <Col md={12}>
                    <h4>
                        {get(i18n, 'product', 'Producto')}
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
                        values={newForm}
                        onChange={e => handleChangeNewForm(e)}
                    />
                    <ButtonsForm
                        handleSubmit={handleSubmitNewForm}
                        routeCancel={routes.list}
                        i18n={i18n}
                        disabledSave={false}
                        labelSave="Guardar"
                        labelCancel="Cancelar"
                    />
                </Col>
            </Row>
        </Container>
    );
};

ProductForm.propTypes = {
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

export default ProductForm;
