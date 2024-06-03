import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'reactstrap';
import logo from '@images/OKLAHOMA-V1-2.png';
import IconButton from '@material-ui/core/IconButton';
import map from 'lodash/map';
import {getRoutes, printElements, getImage} from '@helpers';
import {Typography} from '@mui/material';
import get from 'lodash/get';

const routes = getRoutes('order');

const ProductDetail = ({product, handleRemoveProduct, handleCloseModal, currentQuantity, handleAddProduct}) => {
    const [quantity, setQuantity] = useState(currentQuantity || 0);

    const onRemoveProduct = product => {
        if (quantity === 0) {
            return false;
        }
        handleRemoveProduct(product);
        return setQuantity(quantity - 1);
    };

    const onAddProduct = product => {
        handleAddProduct(product);
        setQuantity(quantity + 1);
    };

    return (
        <Container>
            <Row>
                <Col md={6} xs={6} className="d-flex justify-content-center flex-column">
                    <div className="resume-box mb-4">
                        <div className="body mt-4">
                            <Typography fontSize="22px" fontWeight={800} className=" mb-4 mt-4 subtitle text-black text-center w-100">
                                {`${get(product, 'name')}`}
                            </Typography>
                            <img
                                // eslint-disable-next-line max-len
                                src={getImage(get(product, 'coverimage'))}
                                className="img-fluid rounded-start"
                                alt="..."
                                height={200}
                                style={{
                                    borderRadius: '50px'
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="resume-modal-box">
                            <div className="header bg-dark">
                                Descripcion
                            </div>
                            <div className="body">
                                {map(printElements(product.shortDescription), product => (
                                    <>
                                        {product}
                                        <br/>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={6} xs={6} className="d-flex justify-content-center align-items-center flex-column">
                    <div
                        className="d-flex justify-content-center align-items-center flex-row btn-warning w-100"
                    >
                        <IconButton className="icon-button-plus" disabled={quantity === 0} color="warning" onClick={() => onRemoveProduct(product)}>
                            -
                        </IconButton>
                        <IconButton style={{
                            fontSize: '25px'
                        }}
                        >
                            {quantity}
                        </IconButton>

                        <IconButton className="icon-button-plus" color="primary" onClick={() => onAddProduct(product)}>
                            +
                        </IconButton>
                    </div>
                    <Button
                        disabled={false}
                        color="warning"
                        onClick={() => handleCloseModal()}
                        className="w-100 mb-2"
                    >
                        Confirmar
                    </Button>
                    <Button
                        tag={Link}
                        to={routes.resume}
                        color="warning"
                        className="w-100"
                    >
                        Finalizar
                    </Button>
                    <img className="d-flex justify-content-end mt-4 p-4" height={120} src={logo} alt="logo"/>
                </Col>
            </Row>
        </Container>
    );
};

ProductDetail.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string,
        shortDescription: PropTypes.string
    }).isRequired,
    handleRemoveProduct: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    currentQuantity: PropTypes.number.isRequired,
    handleAddProduct: PropTypes.func.isRequired
};
export default ProductDetail;
