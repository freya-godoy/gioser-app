import React from 'react';
import get from 'lodash/get';
import {UncontrolledPopover, PopoverBody} from 'reactstrap';
import { isMobile } from 'react-device-detect';

export const getColumnsPopover = state => get(state, 'common.tableList.columnsPopover');
export const getHeaders = state => get(state, 'common.tableList.headers');
export const getRouter = state => get(state, 'router.location');

export const tableHome = () => {
    let headers = [
        {
            label: '',
            key: 'image',
            sortType: 'asc',
            className: 'border-0'
        },
        {
            label: 'Titulo',
            key: 'name',
            sortType: 'asc',
            className: 'border-0'
        },
        {
            label: 'Categoria',
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
            label: 'Rankings',
            key: 'rankings',
            className: 'border-0'
        },
        {
            label: 'Ingresar',
            className: 'border-0'
        }
    ];

    let columns = [
        {
            image: true,

            key: 'additionalData.img'
        },
        {
            key: 'name',
            drawInformation: document => document.name
        },
        {
            key: 'categoria',
            drawInformation: document => document.name
        },
        {
            key: 'description',
            drawInformation: document => React.createElement(
                'div',
                {
                    id: `tableTooltip${document.id}`,
                    style: {
                        cursor: 'pointer'
                    }
                },
                'Ver',
                React.createElement(
                    UncontrolledPopover,
                    {
                        trigger: 'hover focus',
                        placement: 'left',
                        target: `tableTooltip${document.id}`
                    },
                    // eslint-disable-next-line react/no-danger-with-children
                    React.createElement(
                        PopoverBody,
                        {
                            dangerouslySetInnerHTML: {
                                __html: document.description
                            }
                        },
                        null
                    )
                )
            )
        },
        {
            key: 'rankings',
            drawInformation: document => document.name
        },
        {
            actions: true,
            view: true,
            className: 'text-center'
        }
    ];

    if (isMobile) {
        headers = [
            {
                label: '',
                key: 'image',
                sortType: 'asc',
                className: 'border-0'
            },
            {
                label: 'Titulo',
                key: 'name',
                sortType: 'asc',
                className: 'border-0'
            },
            {
                label: 'Players',
                key: 'rankings',
                className: 'border-0'
            },
            {
                label: 'Ingresar',
                className: 'border-0'
            }
        ];

        columns = [
            {
                image: true,
                key: 'additionalData.img'
            },
            {
                key: 'name',
                drawInformation: document => document.name
            },
            {
                key: 'players',
                drawInformation: document => document.name
            },
            {
                actions: true,
                view: true,
                className: 'text-center'
            }
        ];
    }
    return {
        columns, headers
    };
};
