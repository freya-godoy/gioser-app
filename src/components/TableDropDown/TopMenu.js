/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Button,
    Fade,
    ListGroup,
    ListGroupItem,
    Row
} from 'reactstrap';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import map from 'lodash/map';

import i18nPropTypes from './i18nProps';

const setActive = (current, expected) => {
    if (current === expected) {
        return {style: {color: '#000'}};
    }

    return null;
};

const TopMenu = ({
    i18n,
    sortOptions,
    onSort,
    onHandleView,
    onSettings,
    currentView,
    onCSVDownload,
    useView
}) => {
    const [isOpen, setOpenOptions] = useState(false);
    const handleClose = option => {
        setOpenOptions(false);
        onSort(option);
    };

    return (
        <Row className="result-top-menu mt-2">
            <Col className="border-right border-dark" sm="12" md="5">
                <h4 className="primary-hover">
                    &nbsp;
                    {i18n.resultSetTitle}
                    &nbsp;
                </h4>
            </Col>
            {onCSVDownload && (
                <Col className="border-right border-dark text-center" sm="4">
                    <Button color="warning" outline onClick={() => onCSVDownload()}>CSV</Button>
                </Col>
            )}
            <Col className="border-right border-dark text-center" sm="2">
                <div className="list-container">
                    <span onClick={() => setOpenOptions(!isOpen)}>
                        &nbsp;
                        {i18n.sortBy}
                        &nbsp;
                        <ArrowDropDownIcon/>
                        &nbsp;
                    </span>
                    <Fade in={isOpen}>
                        <ListGroup>
                            {map(sortOptions, option => (
                                <ListGroupItem
                                    onClick={() => handleClose(option)}
                                    action
                                >
                                    {option.label}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Fade>
                </div>
            </Col>
            {useView && (
                <>
                    {currentView && (
                        <Col className="border-right border-dark" sm="1">
                            <ListIcon
                                onClick={() => onHandleView('list')}
                                {...setActive(currentView, 'list')}
                            />
                        </Col>
                    )}
                    {onHandleView && (
                        <Col className="border-right border-dark" sm="1">
                            <ViewComfyIcon
                                onClick={() => onHandleView('card')}
                                {...setActive(currentView, 'card')}
                            />
                        </Col>
                    )}
                    <Col className="border-right border-dark" sm="1">
                        <ListIcon
                            onClick={() => onHandleView('list')}
                            {...setActive(currentView, 'list')}
                        />
                    </Col>
                </>
            )}
            <Col className="border-right border-dark ml-auto" sm="1">
                <SettingsIcon
                    onClick={() => onSettings && onSettings()}
                />
            </Col>
        </Row>
    );
};

TopMenu.propTypes = {
    ...i18nPropTypes,
    currentView: PropTypes.string.isRequired,
    onSort: PropTypes.func.isRequired,
    onHandleView: PropTypes.func.isRequired,
    sortOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    useView: PropTypes.bool,
    onCSVDownload: PropTypes.func
};

TopMenu.defaultProps = {
    onCSVDownload: null,
    useView: false
};

export default TopMenu;
