import React from 'react';
import PropTypes from 'prop-types';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';

const GoBackIcon = ({onClickBack}) => (
    <div>
        <IconButton
            color="primary"
            onClick={() => onClickBack()}
        >
            <ArrowBackIosIcon
                fontSize="large"
            />
        </IconButton>
    </div>
);

GoBackIcon.propTypes = {
    onClickBack: PropTypes.func.isRequired
};

export default GoBackIcon;
