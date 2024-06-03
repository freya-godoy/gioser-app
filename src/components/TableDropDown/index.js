/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable comma-dangle */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Col,
    Container,
    Row
} from 'reactstrap';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import get from 'lodash/get';

import EmptySearch from '@components/emptySearch';
import Spinners from '@components/spinners';
import Pagination from '@components/Pagination/index';
import Select from 'react-select';
import TopMenu from './TopMenu';
import ListTable from './List';
import CardTable from './Cards';

const TableDropDown = ({
    i18n,
    sortOptions,
    onSort,
    onSettings,
    handleChangePage,
    onCheckAll,
    onSelect,
    onSubmit,
    onCSVDownload,
    actions,
    headers,
    columns,
    loading,
    documents,
    pagination,
    useView
}) => {
    const [currentView, onHandleView] = useState('list');
    const [handleAction, setHandleAction] = useState('');
    const handleActions = ({value}) => {
        setHandleAction(value);
    };

    return (
        <Container fluid className="dropdown-table">
            <Row>
                <Col>
                    <TopMenu
                        {...{
                            i18n,
                            sortOptions,
                            onSort,
                            onHandleView,
                            onSettings,
                            onCSVDownload,
                            currentView,
                            useView
                        }}
                    />
                    {actions && (
                        <Row className="mt-2">
                            <Col>
                                <Select
                                    onChange={option => handleActions(option)}
                                    options={actions}
                                    menuPlacement="auto"
                                />
                            </Col>
                            <Col className="align-self-center">
                                <Button disabled={isEmpty(handleAction)} className="btn-outline-primary" onClick={() => onSubmit(handleAction)}>
                                    {get(i18n, 'apply')}
                                </Button>
                                <br/>
                            </Col>
                        </Row>
                    )}
                    {loading && <Spinners width="4rem" height="4rem" color="danger"/>}
                    {(isEmpty(documents) || !documents) && !loading && (<EmptySearch/>)}
                    {!isEmpty(documents) && !loading && (
                        <>
                            {currentView === 'list' && (
                                <ListTable
                                    {...{
                                        onCheckAll,
                                        onSelect,
                                        documents,
                                        headers,
                                        columns: columns.tabs,
                                        onSort,
                                        i18n,
                                        actions
                                    }}
                                />
                            )}
                            {currentView === 'card' && (<CardTable/>)}
                        </>
                    )}
                </Col>
            </Row>
            {!isEmpty(documents) && (
                <Pagination
                    total={get(pagination, 'total')}
                    pageSize={get(pagination, 'pageSize')}
                    handleChangePage={handleChangePage}
                    maxPaginationNumbers={get(pagination, 'maxPaginationNumbers')}
                    selectedPage={get(pagination, 'selectedPage')}
                />
            )}
        </Container>
    );
};

TableDropDown.propTypes = {
    onSort: PropTypes.func.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    onSettings: PropTypes.func.isRequired,
    handleActions: PropTypes.func.isRequired,
    onCheckAll: PropTypes.func,
    onSelect: PropTypes.func,
    onSubmit: PropTypes.func,
    onCSVDownload: PropTypes.func,
    setPersonPage: PropTypes.func.isRequired,
    i18n: PropTypes.shape({}).isRequired,
    pathname: PropTypes.string.isRequired,
    documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    headers: PropTypes.shape({}).isRequired,
    columns: PropTypes.shape({
        tabs: PropTypes.arrayOf(PropTypes.shape({})),
        cards: PropTypes.arrayOf(PropTypes.shape({}))
    }).isRequired,
    sortOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({})),
    loading: PropTypes.bool,
    pagination: PropTypes.shape({
        total: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        maxPaginationNumbers: PropTypes.number,
        selectedPage: PropTypes.number,
        setPageSize: PropTypes.func,
        records: PropTypes.arrayOf(PropTypes.number)
    }).isRequired,
};

TableDropDown.defaultProps = {
    actions: null,
    loading: false,
    onCheckAll: noop,
    onSelect: noop,
    onSubmit: noop,
    useView: false,
    onCSVDownload: null
};

export default TableDropDown;
