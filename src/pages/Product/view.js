/* eslint-disable react/no-danger */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Container, Row, Col} from 'reactstrap';
import {getRoutes} from '@helpers';
import fromState from '@selectors';
import productActions from '@core/state/Product/actions';
import GoBackIcon from '@components/GoBackIcon';

const routes = getRoutes('product');
const {
    fetchProductRequested,
    clearProductForm
} = productActions;
console.log(clearProductForm, productActions);
const ProductView = ({
    history: {push},
    match: {params}
}) => {
    const {id} = params;
    const isMobile = useSelector(fromState.Session.getIsMobile);
    const newForm = useSelector(fromState.Product.getForm);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(fetchProductRequested(id));
        }
        return () => {
            dispatch(clearProductForm());
        };
    }, [dispatch, id]);

    return (
        <Container
            className={classnames({
                'top-more': !isMobile
            }, 'border-shadow', 'p-4')}
        >
            <Row className="text-center m-0 w-100 pt-4">
                <Col md={12} className="d-flex justify-content-center">
                    <GoBackIcon onClickBack={() => push(routes.list)}/>
                    <h3 className="mt-4 mb-4">
                        {newForm.name}
                    </h3>
                </Col>
                <Col md={12} className="mt-4 mb-4">
                    <img
                        style={{
                            borderRadius: '10px'
                        }}
                        src="https://cocina-casera.com/wp-content/uploads/2014/10/hamburguesa-perfecta-.jpg"
                        alt="NGK_ALC_Mc_Melt_64b0c47df4"
                    />
                </Col>
                <Col md={12} className="p-4">
                    <h5 className="text-justify">
                        <div dangerouslySetInnerHTML={{
                            __html: newForm.description
                        }}
                        />
                    </h5>
                </Col>
            </Row>
        </Container>
    );
};

ProductView.propTypes = {
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
export default ProductView;
