/* eslint-disable react/no-danger-with-children */
import React from 'react';
import get from 'lodash/get';
import {UncontrolledPopover, PopoverBody} from 'reactstrap';

const initialState = {
    headers: [
        {
            label: 'Titulo',
            key: 'name',
            sortType: 'asc',
            className: 'border-0'
        },
        {
            label: 'Descripción',
            key: 'description',
            className: 'border-0'
        },
        {
            label: 'Acciones',
            className: 'border-0'
        }
    ],
    columnsPopover: [
        {
            key: 'name',
            drawInformation: document => get(document, 'name')
        },
        {
            key: 'description',
            drawInformation: document => React.createElement('div', {
                id: `tableTooltip${get(document, 'id')}`,
                style: {cursor: 'pointer'}
            }, 'Ver', React.createElement(UncontrolledPopover, {
                trigger: 'hover focus',
                placement: 'left',
                target: `tableTooltip${get(document, 'id')}`
            }, React.createElement(PopoverBody, {dangerouslySetInnerHTML: {__html: get(document, 'description')}}, null)))
        },
        {
            actions: true,
            delete: true,
            edit: true,
            className: 'text-center'
        }
    ]
};

const TableList = (state = {...initialState}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default TableList;
