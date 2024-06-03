import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Row, Col, Button} from 'reactstrap';
import noop from 'lodash/noop';

const ButtonsForm = ({
    routeCancel,
    handleSubmit,
    disabledCancel,
    disabledSave,
    handleCancel,
    labelSave,
    labelCancel,
    routeSave
}) => {
    const submit = e => {
        e.preventDefault();
        handleSubmit();
    };

    const cancel = e => {
        e.preventDefault();
        handleCancel();
    };
    return (
        <Row className="mt-4 mb-4">
            <Col className="d-flex justify-content-center">
                {routeCancel ? (
                    <Button
                        tag={Link}
                        to={routeCancel}
                        disabled={disabledCancel}
                        color="warning"
                    >
                        {labelCancel}
                    </Button>
                ) : (
                    <Button
                        onClick={cancel}
                        disabled={disabledCancel}
                        color="warning"
                    >
                        {labelCancel}
                    </Button>
                )}

                {routeSave ? (
                    <Button
                        tag={Link}
                        to={routeSave}
                        disabled={disabledSave}
                        color="warning"
                    >
                        {labelSave}
                    </Button>
                ) : (
                    <Button
                        onClick={submit}
                        disabled={disabledSave}
                        color="warning"

                    >
                        {labelSave}
                    </Button>
                )}

            </Col>
        </Row>
    );
};

ButtonsForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleCancel: PropTypes.func,
    routeSave: PropTypes.string,
    routeCancel: PropTypes.string,
    disabledSave: PropTypes.bool,
    disabledCancel: PropTypes.bool,
    labelSave: PropTypes.string.isRequired,
    labelCancel: PropTypes.string.isRequired
};

ButtonsForm.defaultProps = {
    routeCancel: null,
    routeSave: null,
    handleCancel: noop,
    handleSubmit: noop,
    disabledSave: null,
    disabledCancel: null
};

export default ButtonsForm;
