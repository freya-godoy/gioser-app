import React from 'react';
import {Alert} from 'reactstrap';
import PropTypes from 'prop-types';

const Message = ({message, classNames}) => (
    <div>
        <Alert color={classNames}>
            {message}
        </Alert>
    </div>
);

Message.propTypes = {
    message: PropTypes.string.isRequired,
    classNames: PropTypes.string.isRequired
};

export default Message;
