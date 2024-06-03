import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

import compact from 'lodash/compact';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

import {setStatusMessage} from '@core/state/Session/actions';
import fromState from '@selectors';

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props}/>;

function parseMessage(message) {
    if (isArray(message)) {
        return (
            <div>
                {map(compact(message), m => (
                    <div>
                        <p>{m.message}</p>
                    </div>
                ))}
            </div>
        );
    }
    return message;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {marginTop: theme.spacing(2)},
        '& .MuiAlert-message': {fontSize: '17px'},
        '& .MuiSvgIcon-root': {fontSize: '25px'}
    },
    snackBar: {top: '50px'}
}));

const Toast = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {status, message} = useSelector(fromState.Session.getStatusMessage);
    const i18n = useSelector(fromState.Session.getI18N);
    const isOpen = !isEmpty(status);
    const handleClose = () => dispatch(setStatusMessage('', ''));

    if (!status) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Snackbar
                className={classes.snackBar}
                open={isOpen}
                autoHideDuration={8000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Alert onClose={handleClose} severity={status}>
                    {parseMessage(message, i18n) || get(i18n, status)}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Toast;
