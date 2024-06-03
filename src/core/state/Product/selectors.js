/* eslint-disable global-require */
import get from 'lodash/get';
// import map from 'lodash/map';
// import split from 'lodash/split';
import fromState from '@selectors';
import {isMobile} from 'react-device-detect';
import {getFormatOptions} from '../../../helpers/index';
import {CATEGORIES} from '../../../helpers/constants';

export const getListProps = state => get(state, 'product.list');
export const getForm = state => get(state, 'product.form');

// const envToFields = text => {
//     const arrayDeTexto = split(text, ',');
//     return map(arrayDeTexto, item => ({
//         name: item, value: item
//     }));
// };

export const getFields = state => {
    const i18n = fromState.Session.getI18N(state);
    const fields = [
        {
            type: 'multiTypes',
            types: [{
                type: 'text',
                name: 'name',
                text: get(i18n, 'name', 'Nombre'),
                placeHolder: get(i18n, 'contentTitle', 'Nombre')
            },
            {
                type: 'dropdown',
                name: 'category',
                text: 'Categoria',
                placeHolder: get(i18n, 'multicoverImage', 'Categoria'),
                options: getFormatOptions(CATEGORIES)
            }]
        },
        {
            type: 'multiTypes',
            types: [{
                type: 'dropdown',
                name: 'type',
                text: 'Tipo',
                placeHolder: get(i18n, 'multicoverImage', 'Tipo'),
                options: [
                    {
                        name: 'Simple', _id: 'simple'
                    },
                    {
                        name: 'Combo', _id: 'combo'
                    }
                ]
            },
            {
                type: 'dropdown',
                name: 'status',
                text: 'Estado',
                placeHolder: get(i18n, 'multicoverImage', 'Estado'),
                options: [
                    {
                        name: 'Active', _id: 'active'
                    },
                    {
                        name: 'Inactive', _id: 'inactive'
                    }
                ]
            }]
        },
        {
            type: 'textarea',
            name: 'shortDescription',
            text: 'Ingrese los ingredientes separados por coma.',
            placeHolder: get(i18n, 'price', 'Ingredientes'),
            maxLength: 1000
        },
        {
            type: 'multiTypes',
            types: [
                {
                    type: 'text',
                    name: 'coverImage',
                    text: 'Nombre de la Imagen: (previamente guardada en images)',
                    placeHolder: get(i18n, 'price', 'ingresa el nombre de la imagen')
                },
                {
                    type: 'number',
                    name: 'price',
                    text: 'Precio',
                    placeHolder: get(i18n, 'price', 'Precio')
                }]
        }
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
            key: 'name', label: get(i18n, 'name', 'Nombre')
        },
        {
            key: 'price', label: get(i18n, 'category', 'Precio')
        },
        {
            key: 'type', label: get(i18n, 'type', 'Tipo')
        },
        {
            key: 'coverImage', label: get(i18n, 'image', 'Imagen')
        },
        {
            key: 'status', label: get(i18n, 'status', 'Estado')
        },
        {
            key: 'actions', label: get(i18n, 'actions', 'Acciones')
        }
    ];

    const columns = [{
        key: '_id'
    },
    {
        key: 'name'
    }, {
        key: 'price'
    }, {
        key: 'type'
    },
    {
        key: 'coverImage',
        image: true,
        width: '200px'
    }, {
        key: 'status'
    },
    {
        actions: true,
        edit: true,
        view: true,
        delete: true,
        add: true,
        className: 'text-center'
    }];
    if (isMobile) {
        headers.splice(2, 1);
        columns.splice(2, 1);
    }
    return {
        headers, columns
    };
};
