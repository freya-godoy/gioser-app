/* eslint-disable react/prefer-stateless-function */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import {Container, Row, Col, Input} from 'reactstrap';
import ButtonsForm from '@components/ButtonsForm';
import Detail from './detail';

const OrderView = ({handleClickPrint, handleCloseModal, order}) => {
    const [numberId, setNumberId] = useState();
    const [notes, setNotes] = useState();

    const handleChangeNumberId = e => {
        setNumberId(e.target.value);
    };
    const handleChangeNotes = e => {
        setNotes(e.target.value);
    };

    const saveAndPrint = (numberId, notes, order, id) => {
        handleClickPrint(numberId, notes, order, id);
    };

    return (
        <Container fluid className={classnames('border-shadow')}>
            <Row className="d-flex justify-content-center align-items-center">
                <Col className="p-4">
                    <div className="mr-4 ml-4">
                        <h3 className="font-shoulders"> Ingrese numero de Localizador</h3>
                        <Input
                            type="number"
                            max={100}
                            value={numberId}
                            onChange={e => handleChangeNumberId(e)}
                            className="p-4"
                        />
                    </div>
                </Col>
            </Row>
            <Detail order={order}/>
            <Row className="d-flex justify-content-center align-items-center">
                <Col className="p-4">
                    <div className="mr-4 ml-4">
                        <h3 className="font-shoulders"> Notas</h3>
                        <Input
                            type="textarea"
                            value={notes}
                            onChange={e => handleChangeNotes(e)}
                            className="p-4"
                        />
                    </div>
                </Col>
            </Row>
            <ButtonsForm
                handleSubmit={() => saveAndPrint(numberId, notes, order, order._id)}
                disabledSave={isEmpty(numberId)}
                labelSave="Imprimir"
                labelCancel="Cerrar"
                handleCancel={() => handleCloseModal()}
            />
        </Container>
    );
};

OrderView.propTypes = {
    handleClickPrint: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    order: PropTypes.shape({
        _id: PropTypes.string.isRequired
    }).isRequired
};
export default OrderView;
