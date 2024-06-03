import get from 'lodash/get';
import last from 'lodash/last';

import {UUID} from '@helpers';

export const childModel = values => ({
    key: UUID(),
    title: '',
    description: '',
    ...values
});

export const addChild = (item, values) => {
    if (item) {
        item.push({
            id: get(last(item), 'id', 0) + 1,
            ...childModel(values),
            order: get(last(item), 'order', 0) + 1
        });
        return item;
    }
    return [{
        id: 1, ...childModel(values), order: 1
    }];
};
