/* eslint-disable global-require */
import get from 'lodash/get';
// import map from 'lodash/map';
// import split from 'lodash/split';
import fromState from '@selectors';
import {isMobile} from 'react-device-detect';

export const getListProps = state => get(state, 'order.list');
export const getForm = state => get(state, 'order.form');

export const getFields = state => {
    const i18n = fromState.Session.getI18N(state);
    // const productListProps = fromState.Product.getListProps(state);
    const form = getForm(state);

    const fields = [
        {
            type: 'multiTypes',
            types: [
            //     {
            //     type: 'text',
            //     name: 'detail',
            //     text: get(i18n, 'detail', 'Detalle'),
            //     placeHolder: get(i18n, 'contentTitle', 'Detalle')
            // },
            {
                type: 'dropdown',
                name: 'status',
                disabled: form._id && form.status !== 'pending',
                text: 'Estado',
                placeHolder: get(i18n, 'multicoverImage', 'Estado'),
                options: [
                    {
                        name: 'pending', _id: 'pending'
                    },
                    {
                        name: 'process', _id: 'process'
                    },
                    {
                        name: 'done', _id: 'done'
                    }
                ]
            }]
        },
        // {
        //     type: 'number',
        //     name: 'numberId',
        //     text: 'Cosita Asignada',
        //     placeHolder: get(i18n, 'price', 'ingresa el nombre de la imagen')
        // }
    ];
    return fields;
};

export const getTable = state => {
    const i18n = fromState.Session.getI18N(state);
    const headers = [
        {
            key: '_id', label: get(i18n, 'id', 'ID')
        },
        {
            key: 'createdAt', label: get(i18n, 'date', 'Fecha')
        },
        {
            key: 'total', label: get(i18n, 'total', 'Total')
        },
        {
            key: 'status', label: get(i18n, 'status', 'Estado')
        },
        {
            key: 'numberId', label: get(i18n, 'status', 'Nro Localizador')
        },
        {
            key: 'actions', label: get(i18n, 'actions', 'Acciones')
        },
        {
            key: 'buttons', label: get(i18n, 'numberId', 'Enviar')
        }
    ];

    const columns = [{
        key: '_id'
    },
    {
        key: 'createdAt',
        date: true
    },
    {
        key: 'total'
    }, {
        key: 'status'
    }, {
        key: 'numberId'
    },
    {
        actions: true,
        edit: true,
        delete: true,
        className: 'text-center'
    },
    {
        button: true, label: 'enviar', color: 'primary'
    }];
    if (isMobile) {
        headers.splice(2, 1);
        columns.splice(2, 1);
    }
    return {
        headers, columns
    };
};
