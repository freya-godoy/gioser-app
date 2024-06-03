import React from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import get from 'lodash/get';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import join from 'lodash/join';
import pick from 'lodash/pick';
import toLower from 'lodash/toLower';
import values from 'lodash/values';

import {formatDate, formatMoney, getStatus} from '@helpers';

// eslint-disable-next-line import/prefer-default-export
export const drawItemLabel = (format, item, i18n) => {
    if (isArray(format)) {
        return join(values(pick(item, format)), ' ');
    }
    if (includes(['status'], format)) {
        const currentStatus = 'active';
        return (
            <>
                <FiberManualRecordIcon style={{color: currentStatus.color}}/>
                &nbsp;
                {currentStatus.label}
            </>
        );
    }
    if (isString(format)) {
        return get(item, format);
    }

    if (format.convertTo) {
        const {type, key} = format;
        if (type === 'date') {
            if (get(item, key)) {
                return formatDate(get(item, key), 'DD/MM/YYYY');
            }

            return null;
        }
        if (type === 'currency') {
            return formatMoney(get(item, key));
        }
        return get(item, format.key);
    }

    return false;
};
