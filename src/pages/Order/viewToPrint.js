/* eslint-disable react/prefer-stateless-function */
import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import classnames from 'classnames';
import {Container} from 'reactstrap';
import ButtonsForm from '@components/ButtonsForm';
import Detail from './detail';

class PrintableDetail extends React.Component {
    render() {
        return <Detail order={get(this.props, 'order')}/>;
    }
}

const OrderView = ({handleCloseModal, order}) => {
    const componentRef = useRef();

    return (
        <Container fluid className={classnames('border-shadow')}>
            <PrintableDetail ref={componentRef} order={order}/>
            <ButtonsForm
                disabledSave={false}
                labelSave="Imprimir"
                labelCancel="Cerrar"
                handleCancel={() => handleCloseModal()}
            />
        </Container>
    );
};

OrderView.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    order: PropTypes.shape({
        _id: PropTypes.string.isRequired
    }).isRequired
};
export default OrderView;
