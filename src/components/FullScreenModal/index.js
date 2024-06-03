import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';

import get from 'lodash/get';

import useStyles from './miuStyles';

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props}/>);

const FullScreenModal = ({
    children,
    onSubmit,
    handleClose,
    title,
    i18n,
    className
}) => {
    const classes = useStyles();
    return (
        <Dialog fullScreen open onClose={handleClose} TransitionComponent={Transition} className={className}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h5" className={classes.title}>
                        {title}
                    </Typography>
                    <Button
                        color="inherit"
                        className="border border-light"
                        onClick={() => onSubmit()}
                    >
                        {get(i18n, 'save')}
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container className={classes.rootGrid}>
                {children}
            </Grid>
        </Dialog>
    );
};

FullScreenModal.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    i18n: PropTypes.shape({save: PropTypes.string}).isRequired,
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
};

export default FullScreenModal;
