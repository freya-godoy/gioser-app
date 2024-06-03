import React from 'react';
import {Modal, ModalBody} from 'reactstrap';
import PropTypes from 'prop-types';

const CustomModal = ({open, toggle, children}) => (
    <Modal className="rounded" isOpen={open} toggle={toggle}>
        <ModalBody style={{
            padding: 0
        }}
        >
            {children}
        </ModalBody>
    </Modal>
);

CustomModal.propTypes = {
    open: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
};

export default CustomModal;
