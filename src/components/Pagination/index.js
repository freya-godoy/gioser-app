import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Input} from 'reactstrap';

import ceil from 'lodash/ceil';
import map from 'lodash/map';
import noop from 'lodash/noop';
import toNumber from 'lodash/toNumber';

import Pagination from './Pagination';

const Main = ({
    total,
    pageSize,
    handleChangePage,
    maxPaginationNumbers,
    selectedPage,
    setPageSize,
    records
}) => {
    const currentAmount = pageSize * (selectedPage + 1);
    const PAGE_SIZE_MINUS_ONE = pageSize - 1;
    const seeing = currentAmount > total ? total : currentAmount;
    const pages = ceil(total / pageSize);

    return (
        <Row className="mt-4">
            {records && (
                <Col sm={1} className="mt-2">
                    <Input
                        type="select"
                        bsSize="sm"
                        value={pageSize}
                        onChange={({target: {value}}) => setPageSize(toNumber(value))}
                    >
                        {map(records, opt => (<option>{opt}</option>))}
                    </Input>
                </Col>
            )}
            <Col className="d-flex justify-content-center">
                <Pagination
                    pageSize={pageSize}
                    currentPages={pages}
                    onSelect={page => handleChangePage(page)}
                    maxPaginationNumbers={maxPaginationNumbers}
                    currentActivePage={selectedPage + 1}
                    selectedPage={selectedPage}
                />
            </Col>
            <small className="mt-2 col-sm-2">
                <b>
                    {currentAmount > seeing
                        ? currentAmount - PAGE_SIZE_MINUS_ONE
                        : seeing - PAGE_SIZE_MINUS_ONE}
                </b>
                &nbsp;-&nbsp;
                <b>{seeing}</b>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <b>{total}</b>
            </small>
        </Row>
    );
};

Main.propTypes = {
    total: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    handleChangePage: PropTypes.func.isRequired,
    maxPaginationNumbers: PropTypes.number.isRequired,
    selectedPage: PropTypes.number.isRequired,
    setPageSize: PropTypes.func,
    records: PropTypes.arrayOf(PropTypes.number)
};

Main.defaultProps = {
    setPageSize: noop,
    pageSize: 15,
    records: null
};

export default Main;
