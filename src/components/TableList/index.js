import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Row, Col, Button, Input, Label, Table, InputGroupAddon, InputGroup, InputGroupText} from 'reactstrap';

import SettingsIcon from '@material-ui/icons/Settings';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@material-ui/icons/GetApp';

import get from 'lodash/get';
import map from 'lodash/map';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';
import size from 'lodash/size';
import uniqueId from 'lodash/uniqueId';

import Pagination from '@components/Pagination';
import EmptySearch from '@components/emptySearch';
import {isMobile} from 'react-device-detect';
import {formatDate} from '@helpers';
import { Link } from 'react-router-dom';

export const getDocumentByColumn = (document, column) => get(document, get(column, 'key', null));

const TableList = ({
    onDelete,
    onEdit,
    onDownload,
    onView,
    onAdd,
    onSort,
    onSelectAll,
    onClickButton,
    onSelect,
    headers,
    columns,
    documents,
    pagination,
    onSettings,
    withOutPagination,
    withOutImage,
    handleChangePage,
    onButtonAction,
    onButtonActionLabel,
    i18n
}) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = event => {
        // Actualiza el estado con el nuevo valor del input
        setInputValue(event.target.value);
    };

    const handleConfirm = event => {
        // Actualiza el estado con el nuevo valor del input
        setInputValue(event.target.value);
    };

    return (
        <>
            {onSettings && (
                <Row className="d-flex flex-row-reverse bd-highlight mr-2 mb-2">
                    <div className="border-right  border-left bd-highlight p-2" sm="1">
                        <SettingsIcon onClick={() => onSettings()}/>
                    </div>
                </Row>
            )}
            {onButtonAction && (
                <div className="d-flex">
                    <div className="ml-auto">
                        <Button onClick={() => onButtonAction()} color="primary">
                            {get(i18n, onButtonActionLabel, onButtonActionLabel)}
                        </Button>
                    </div>
                </div>
            )}
            {isEmpty(documents) && !withOutImage && (
                <Row className="mb-5">
                    <Col>
                        <EmptySearch i18n={i18n}/>
                    </Col>
                </Row>
            )}
            {!isEmpty(documents) && (

                <Row className="m-0 w-100">
                    <Col className="p-0">
                        <Table
                            hover
                            style={{
                                maxWidth: '100vw'
                            }}
                            className="table-list p-0"
                        >
                            <thead>
                                <tr>
                                    {map(headers, header => (
                                        <th
                                            key={uniqueId('tableListHeader')}
                                            className={header.className}
                                            style={header.style}
                                            onClick={() => onSort(header)}
                                            scope="col"
                                        >
                                            {header.label}
                                            {header.checkAll && (
                                                <Label>
                                                    <Input
                                                    // eslint-disable-next-line jsx-a11y/aria-role
                                                        role="checkAll"
                                                        className="d-none"
                                                        type="checkbox"
                                                        checked={header.checked}
                                                        onClick={() => onSelectAll()}
                                                    />
                                                    {!header.checked && <CheckBoxOutlineBlankIcon/>}
                                                    {header.checked && <CheckBoxIcon/>}
                                                </Label>
                                            )}
                                            &nbsp;
                                            {header.sort && header.sortType !== 'asc' && (
                                                <ArrowDownwardIcon/>
                                            )}
                                            {header.sort && header.sortType === 'asc' && (
                                                <ArrowUpwardIcon/>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {map(documents, (document, it) => (
                                    <tr
                                        key={uniqueId('tableListBodyTr')}
                                        labelById={get(document, '_id')}
                                    >
                                        {map(columns, column => (
                                            <td
                                                className={classNames(
                                                    'border-left-0 border-right-0 border-top-0',
                                                    'border-bottom align-middle',
                                                    column.className
                                                )}
                                                key={uniqueId('tableListBodyTd')}
                                                {...(column.title
                                                    ? {
                                                        title: get(document, column.title)
                                                    }
                                                    : {
                                                    })}
                                            >
                                                {column.check && (
                                                    <Label>
                                                        <Input
                                                            className="d-none"
                                                            type="checkbox"
                                                            checked={getDocumentByColumn(document, column)}
                                                            onClick={({target: {checked}}) => onSelect(document, checked)}
                                                        />
                                                        {!getDocumentByColumn(document, column) && (
                                                            <CheckBoxOutlineBlankIcon/>
                                                        )}
                                                        {getDocumentByColumn(document, column) && (
                                                            <CheckBoxIcon/>
                                                        )}
                                                    </Label>
                                                )}
                                                {column.image && (

                                                    <img
                                                        width={isMobile ? '50' : '80'}
                                                        height={isMobile ? '50' : '80'}
                                                        alt="avatar"
                                                        src={get(document, column.key)}
                                                    />
                                                )}
                                                {column.button && (

                                                    <Button
                                                        onClick={() => onClickButton(document, it)}
                                                        color="warning"
                                                    >
                                                        {document.status === 'pending' && 'Enviar '}
                                                        {document.status === 'process' && 'Terminar'}
                                                        {document.status === 'done' && 'Ver'}
                                                    </Button>
                                                )}
                                                {column.actions && (
                                                    <>
                                                        {column.edit && (
                                                            <Button
                                                                onClick={() => onEdit(document, it)}
                                                                color="light"
                                                                className="btn-grey"
                                                            >
                                                                <CreateIcon/>
                                                            </Button>
                                                        )}
                                                        {column.view && (
                                                            <Button
                                                                onClick={() => onView(document, it)}
                                                                color="light"
                                                                className="btn-grey"
                                                            >
                                                                <VisibilityIcon/>
                                                            </Button>
                                                        )}
                                                        {column.download && (
                                                            <Button
                                                                onClick={() => onDownload(document, it)}
                                                                color="light"
                                                                className="btn-grey"
                                                            >
                                                                <FileDownloadIcon/>
                                                            </Button>
                                                        )}
                                                        {column.add && (
                                                            <Button
                                                                onClick={() => onAdd(document, it)}
                                                                color="light"
                                                                className="btn-grey"
                                                            >
                                                                <ContentCopyIcon/>
                                                            </Button>
                                                        )}
                                                        {column.delete && (
                                                            <Button
                                                                onClick={() => onDelete(document, it)}
                                                                color="light"
                                                                className="btn-grey"
                                                            >
                                                                <DeleteIcon/>
                                                            </Button>
                                                        )}
                                                    </>
                                                )}
                                                {column.date && formatDate(get(document, column.key))}
                                                {column.drawInformation && column.drawInformation(document)}
                                                {!column.drawInformation && !column.date && !column.button && !column.image
                                                 && get(document, column.key)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                            {pagination && (
                                <tfoot>
                                    <tr>
                                        <td colSpan={size(columns)}>
                                            {!isEmpty(documents) && !withOutPagination && (
                                                <Pagination
                                                    handleChangePage={handleChangePage}
                                                    {...pagination}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                </tfoot>
                            )}
                        </Table>
                    </Col>
                </Row>
            )}
        </>
    );
};

TableList.propTypes = {
    onDelete: PropTypes.func,
    onClickButton: PropTypes.func,
    onEdit: PropTypes.func,
    onAdd: PropTypes.func,
    onButtonAction: PropTypes.func,
    onButtonActionLabel: PropTypes.string,
    onSelectAll: PropTypes.func,
    onSettings: PropTypes.func,
    onDownload: PropTypes.func,
    onView: PropTypes.func,
    columns: PropTypes.arrayOf(PropTypes.shape({
    })),
    documents: PropTypes.arrayOf(PropTypes.shape({
    })),
    onSort: PropTypes.func,
    pagination: PropTypes.shape({
        total: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        maxPaginationNumbers: PropTypes.number,
        selectedPage: PropTypes.number,
        setPageSize: PropTypes.func,
        records: PropTypes.arrayOf(PropTypes.number)
    }),
    onSelect: PropTypes.shape({
    }).isRequired,
    headers: PropTypes.shape({
    }).isRequired,
    i18n: PropTypes.shape({
    }).isRequired,
    handleChangePage: PropTypes.func.isRequired,
    withOutPagination: PropTypes.bool,
    withOutImage: PropTypes.bool
};

TableList.defaultProps = {
    columns: [],
    documents: [],
    pagination: null,
    onSort: noop,
    withOutPagination: false,
    onDelete: noop(),
    onEdit: noop(),
    onAdd: noop(),
    onButtonAction: noop(),
    onSelectAll: noop(),
    onSettings: noop(),
    onDownload: noop(),
    onView: noop(),
    onButtonActionLabel: '',
    withOutImage: false
};

export default TableList;
