/* global FileReader, Blob */
import Swal from 'sweetalert2';
import moment from 'moment';
import PapaParse from 'papaparse';
import {
    saveAs
} from 'file-saver';

import cloneDeep from 'lodash/cloneDeep';
import dropRight from 'lodash/dropRight';
import filter from 'lodash/filter';
import flatMap from 'lodash/flatMap';
import flattenDepth from 'lodash/flattenDepth';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import includes from 'lodash/includes';
import indexOf from 'lodash/indexOf';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import join from 'lodash/join';
import last from 'lodash/last';
import noop from 'lodash/noop';
import map from 'lodash/map';
import pick from 'lodash/pick';
import replace from 'lodash/replace';
import set from 'lodash/set';
import size from 'lodash/size';
import slice from 'lodash/slice';
import split from 'lodash/split';
import sortBy from 'lodash/sortBy';
import toNumber from 'lodash/toNumber';
import toLower from 'lodash/toLower';
import trim from 'lodash/trim';
import values from 'lodash/values';

import {
    FIELDS_TYPES
} from '@helpers/constants';

import routeContent from './navigation';

export const formatDate = (dateString, format = 'DD/MM/YY HH:mm') => moment(dateString).format(format);
export const getDate = date => formatDate(new Date(date * 1000));

export const formatMoney = amount => {
    if (amount && amount !== 'null') {
        return toNumber(amount).toLocaleString('es-ar', {
            style: 'currency',
            currency: 'ARS', // USS
            minimumFractionDigits: 0,
            maximumSignificantDigits: 9
        });
    }
    return '$ 0';
};

export const flatDeepText = object => {
    const newValues = flattenDepth(map(object, o => values(o)), 3);
    const objects = filter(newValues, v => isPlainObject(v));
    const texts = filter(newValues, v => isString(v));
    let subFilter = [];
    if (!isEmpty(objects)) {
        subFilter = flatDeepText(objects);
    }
    return [...subFilter, ...texts];
};

export const getRoutes = entity => {
    if (isArray(entity)) {
        return pick(routeContent, entity);
    }
    if (entity) {
        return get(routeContent, entity);
    }

    return routeContent;
};

export const jsonToString = (stringOrJson, toString = false) => {
    try {
        if (toString) {
            return JSON.stringify(stringOrJson);
        }
        if ((!stringOrJson && stringOrJson !== false) || stringOrJson === 'undefined') {
            return null;
        }
        if (isString(stringOrJson)) {
            return JSON.parse(stringOrJson);
        }

        return stringOrJson;
    } catch (error) {
        return stringOrJson;
    }
};

export const convertToParams = formValues => JSON.stringify(formValues);

export const convertBlobToBase64 = blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = ({target}) => resolve(target.result);
    reader.readAsBinaryString(blob);
});

export const alertMessage = ({
    icon,
    title,
    text,
    html = null,
    timer = undefined,
    showCancelButton = false,
    reverseButtons = false,
    confirmButtonText = 'Aceptar',
    cancelButtonText = 'Cancelar'
}) => Swal.fire({
    icon,
    text,
    html,
    title,
    confirmButtonText,
    showCancelButton,
    cancelButtonText,
    reverseButtons,
    showCloseButton: false,
    timer
});

export function swalConfirmAction(icon, title, text, confirmButtonText, cancelButtonText, actionConfirm, CancelConfirm = noop) {
    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonColor: '#FBAF40',
        cancelButtonColor: '#FBAF40',
        reverseButtons: true,
        confirmButtonText,
        cancelButtonText
    }).then(result => {
        if (!result.value) {
            return CancelConfirm();
        }
        return actionConfirm();
    });
}

// eslint-disable-next-line lodash/matches-prop-shorthand
export const orderBy = (array, field) => sortBy(array, [field], ['asc']);

export const ExpiredSession = (status, route = getRoutes('mainRoutes').home) => {
    if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location = route;
    }
};


export const UUID = () => {
    let dt = new Date().getTime();
    const uuid = replace('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', /[xy]/g, c => {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
    });
    return uuid;
};

export const scrollTo = (element, to, duration) => {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        // eslint-disable-next-line
        if (t < 1) {
            return c / 2 * t * t + b;
        }
        // eslint-disable-next-line
        t--;
        // eslint-disable-next-line
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    const animateScroll = () => {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
};

export const getErrorMsg = objectMessages => {
    const messageError = [];
    if (objectMessages.message) { return objectMessages.message; }
    let code = get(objectMessages, 'code');
    let data = get(objectMessages, 'data');
    let details = get(objectMessages, 'detail');

    if (isString(!data) && isString(!details)) {
        data = values(data);
        details = values(details);
        code = values(code);
        map(details, (item, key) => {
            messageError.push([data[key], item, code[key]]);
        });
    }
    if (isString(data)) {
        messageError.push([data, details, code]);
    }
    return messageError[0];
};

export const filterListDocuments = ({
    itemsToFilter,
    value,
    field,
    picks
}) => {
    const documents = filter(itemsToFilter, item => includes(
        field ? get(item, field) : toLower(join(values(picks ? pick(item, picks) : item))),
        toLower(`${value}`)
    ));
    const resultsCount = size(documents);
    return {
        documents,
        resultsCount
    };
};

export const resetStaticTypeField = field => last(split(field, '='));
export const updateFontSize = val => document.documentElement.style.setProperty('--size-multiply', val);

export const updateBorderRadius = val => document.documentElement.style.setProperty('--size-border-radius', val, 'important');

export const updateVariableColor = (key, val) => {
    if (val && key) {
        document.documentElement.style.setProperty(`--${key}`, val, 'important');
    }
};

export const removeDash = val => replace(val, '-', '');

export const paginatesDocuments = ({
    documents,
    currentPage,
    pageSize
}) => {
    const pageMinusOne = currentPage - 1;
    const from = ((pageMinusOne < 0 ? 0 : pageMinusOne) * pageSize);
    return slice(documents, from, pageSize * (currentPage === 0 ? 1 : currentPage + 1));
};
export const filterToString = ({
    allItems,
    key,
    value
}) => filter(allItems,
    item => toNumber(item[`${key}`]) === toNumber(value));

export const replaceMiddleHyphen = string => {
    try {
        return replace(string, /_/g, ' ');
    } catch (error) {
        return null;
    }
};

export const matchFunction = (value, compareTo) => includes(toLower(compareTo), toLower(value));
export const maskPhone = type => {
    switch (type) {
        case 'countryCode':
            return '+99';
        case 'number':
            return '99999999';
        default:
            return '999';
    }
};

export const generateDocumentResponse = documents => ({
    resultsCount: size(documents),
    documents: map(documents, doc => {
        map(doc, (value, key) => set(doc, key, value));
        return doc;
    }),
    hasOwnPagination: true
});

export const normalizeColorValue = value => {
    if (/linear-gradient/.test(value)) {
        const regexpColors = /#([a-fA-F0-9]{0,2}){0,3}/gi;
        const regexpPosition = /(to )?(bottom|right|top|left){1,2}/gi;
        const [firstColor, secondColor] = value.match(regexpColors);
        const position = (value.match(regexpPosition)).join(' ');

        if (!position || !firstColor || !secondColor) {
            return null;
        }

        return {
            position,
            firstColor,
            secondColor
        };
    }
    return value;
};

export const dateOperation = ({
    date,
    operation,
    quantity,
    type,
    format
}) => {
    let newDate;
    if (operation === 'add') {
        newDate = moment(date).add(quantity, type);
    }
    if (operation === 'rest') {
        newDate = moment(date).subtract(quantity, type);
    }
    return newDate.format(format);
};

export const searchInArray = (array, element) => {
    const searched = indexOf(array, element);
    if (searched === -1) {
        return false;
    }
    return searched;
};

export const getWorkedFilters = (filters, filtersApply, i18n) => {
    const workedFilters = map(filters, fil => {
        const el = cloneDeep(fil);
        if (el.type === FIELDS_TYPES.DROPDOWN) {
            el.type = toLower(fil.type);
            if (!el._id) {
                el._id = fil.name;
            }
            el.value = get(filtersApply, fil.name);
            el.options = fil.items;
            if (!isEmpty(fil.items) && isString(get(fil.items, 0))) {
                el.options = getFormatOptions(fil.items, i18n);
            }
            el.name = fil.name;
            el.text = '';
            el.isClearable = true;
            return el;
        }
        if (el.type === FIELDS_TYPES.CHECKBOX) {
            el.type = fil.type;
            el.id = fil.name;
            el.name = fil.name;
            el.title = get(i18n, fil.name, fil.name);
            el.options = map(fil.items, item => {
                const it = {
                };
                it.id = fil.name;
                it.value = item;
                it.type = 'checkbox';
                it.title = get(i18n, item, item);
                it.text = get(i18n, toLower(item), item);
                it.name = item;
                return it;
            });
            return el;
        }
        return el;
    });
    return workedFilters;
};

export const convertAgentOrUser = ({
    _id,
    name,
    surname,
    identification,
    ...props
}) => (
    surname ? {
        ...props,
        _id,
        id: _id,
        subName: `(${identification}) ${surname}, ${name}`,
        name,
        surname
    } : {
        ...props,
        _id,
        id: _id,
        subName: `(${identification}) ${name}`,
        name,
        surname
    }
);

export const validateContentAndUrl = obj => {
    const urlPattern = /https?:\/\/([a-zA-Z0-9-@]{1,}.)*[a-z]{1,3}/;
    const urlContent = /[a-z]{2,3}-[A-Z]{2,3}|default/;
    const areEmpty = !isEmpty(obj.contentType) && !isEmpty(obj.url);

    return areEmpty && urlPattern.test(obj.url) && urlContent.test(obj.contentType);
};

export const exportToCSV = ({
    data,
    headers,
    i18n,
    name = 'export'
}) => {
    const CSVObject = {
        fields: map(headers, key => get(i18n, key, key)),
        data: map(data, d => {
            const valueToReturn = flatMap(headers, h => {
                const finalValue = get(d, h);
                if (isArray(finalValue)) {
                    return map(finalValue, fv => values(fv));
                }
                if (isString(finalValue) && /(\d\d\d\d-\d\d-\d\d).+/.test(finalValue)) {
                    const date = moment(finalValue, moment.ISO_8601, true);
                    return date.format('DD/MM/YYYY HH:mm');
                }
                return finalValue;
            });

            return valueToReturn;
        })
    };
    const CSV = PapaParse.unparse(CSVObject);
    const file = new Blob([CSV], {
        encoding: 'UTF-8',
        type: 'text/csv;charset=UTF-8'
    });
    const date = new Date();
    return saveAs(file, `${name}_${date.getFullYear()}_${date.getDate()}_${date.getMonth() + 1}_${date.getHours()}_${date.getMinutes()}.csv`);
};

export const validateSyllabusStructure = (data, i18n) => {
    const errors = [];

    const checkValidateErrors = ({
        title,
        collection
    }, parentTitle, parent = false) => {
        if (!title) {
            errors.push(
                parent ? get(i18n, 'errorSyllabusParent') : replace(get(i18n, 'errorSyllabusChild'), '##TITLE##', parentTitle)
            );
        }

        if (collection) {
            forEach(collection, d => checkValidateErrors(
                d,
                parent ? title : `${parentTitle} - ${title}`
            ));
        }
    };

    forEach(data, d => checkValidateErrors(d, '', true));

    return errors;
};

export const fixStaticBlockUrl = staticBlock => trim(replace(staticBlock, /<!DOCTYPE html>|<html>|<\/html>|<head>|<\/head>|<body>|<\/body>|\r/g, ''));

export const spliceString = (string, number) => {
    if (string) {
        return `${string.slice(0, number)} ...`;
    }
    return '';
};

export const importAllImages = name => {
    const images = {
    };
    const imageContext = require.context('../images', false, /\.(png|jpg|jpeg|gif|svg)$/);
    imageContext.keys().forEach(key => {
        const imageName = key.replace('./', '');
        images[imageName] = imageContext(key);
    });
    if (name) { return images[name].default; }
    return images;
};

export const renderImages = images => {
    Object.keys(images).map(imageName => (
        <img key={imageName} src={images[imageName].default} alt={imageName}/>
    ));
};

export const printElements = element => map(split(element, ','));

const importAll = r => {
    const images = {
    };
    r.keys().map(element => {
        images[element.replace('./', '')] = r(element);
        return false;
    });
    return images;
};

export const getImage = nameImage => {
    const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
    if (nameImage in images) {
        return images[nameImage].default;
    }
    return nameImage;
};

