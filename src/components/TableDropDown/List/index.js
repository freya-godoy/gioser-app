import React, {useState, memo} from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col} from 'reactstrap';
import classNames from 'classnames';

import every from 'lodash/every';
import get from 'lodash/get';
import map from 'lodash/map';
import noop from 'lodash/noop';
import uniqueId from 'lodash/uniqueId';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DrawInfo from './drawInfo';
import {drawItemLabel} from '../utils';

const MemoDrawInfo = memo(DrawInfo);

const List = ({
    headers,
    onSort,
    onCheckAll,
    onSelect,
    documents,
    columns,
    i18n,
    actions
}) => {
    const [selectedElement, onSelectElement] = useState(null);
    const [activeTab, onToggle] = useState(null);

    const handleSelectElement = id => {
        onToggle(0);
        if (id === selectedElement) {
            return onSelectElement(null);
        }
        return onSelectElement(id);
    };

    return (
        <Container fluid className="m-0 p-0 mt-3 dropdown-list">
            <Row className="border-top border-bottom p-2 header">
                {map(headers, header => (
                    <>
                        {get(header, 'check') && (
                            <Col sm="1" className="text-center" onClick={() => onCheckAll()} key={uniqueId('headerList')}>
                                {(!documents || !every(documents, document => document.checked)) && (<CheckBoxOutlineBlankIcon className="mb-1"/>)}
                                {documents && every(documents, document => document.checked) && (<CheckBoxIcon className="mb-1"/>)}
                            </Col>
                        )}
                        {get(header, 'label') && (
                            <Col
                                md={get(header, 'md')}
                                className={classNames('text-left', get(header, 'headerClassName', {
                                    pointer: Boolean(header.sort)
                                }))}
                                key={uniqueId('headerList')}
                                {...{
                                    onClick: header.sort ? () => onSort(header) : noop,
                                    title: header.sort ? `Se puede ordenar x ${header.label}` : null
                                }}
                            >
                                {header.label}
                                &nbsp;
                                {header.sort === 'desc' && (<ArrowUpwardIcon/>)}
                                {header.sort === 'asc' && (<ArrowDownwardIcon/>)}
                            </Col>
                        )}
                    </>
                ))}
                <Col sm="1"/>
            </Row>
            {map(documents, (document, it) => (
                <section className="list-item p-1 pl-3" key={`Section-${document._id}-${it}`}>
                    <Row className="header d-flex align-items-center" onClick={!actions ? () => handleSelectElement(document._id) : noop()}>
                        {map(headers, header => (
                            <>
                                {get(header, 'check') && (
                                    <Col sm="1" className="text-center" onClick={() => onSelect(document, it)}>
                                        {!document.checked && (<CheckBoxOutlineBlankIcon className="mb-1"/>)}
                                        {document.checked && (<CheckBoxIcon className="mb-1"/>)}
                                    </Col>
                                )}
                                {get(header, 'label') && (
                                    <Col md={get(header, 'md')} xs={get(header, 'md')} className={classNames('text-left', get(header, 'className'))}>
                                        {drawItemLabel(header.key, document, i18n)}
                                    </Col>
                                )}
                            </>
                        ))}
                        <Col sm="1 pointer" onClick={actions ? () => handleSelectElement(document._id) : noop()}>
                            {selectedElement !== document._id && (<ExpandLessIcon className="mb-1"/>)}
                            {selectedElement === document._id && (<ExpandMoreIcon className="mb-1"/>)}
                        </Col>
                    </Row>
                    {selectedElement === document._id && (
                        <Row className="p-1 d-flex align-items-center" key={`drawElement${document._id}`}>
                            <Col>
                                <MemoDrawInfo {...{
                                    columns, activeTab, onToggle, document
                                }}
                                />
                            </Col>
                        </Row>
                    )}
                </section>
            ))}
        </Container>
    );
};

List.propTypes = {
    onSort: PropTypes.func.isRequired,
    onCheckAll: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    headers: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    documents: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    i18n: PropTypes.shape({
    }).isRequired
};

export default List;
