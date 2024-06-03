import React from 'react';

import {useSelector} from 'react-redux';

import get from 'lodash/get';

import Spinners from '@components/spinners';

import fromState from '@selectors';

function ActionFadeDrop() {
    const {flagData, type} = useSelector(fromState.Session.getFlagData);
    const i18n = useSelector(fromState.Session.getI18N);
    if (flagData) {
        return (
            <>
                <div
                    className="modal fade show d-flex align-items-center justify-content-center"
                    role="dialog"
                >
                    <h1 className="text-white">
                        {get(i18n, type, get(i18n, 'loading'))}
                        <Spinners width="5rem" height="5rem" color="danger"/>
                    </h1>
                </div>
                <div
                    className="modal-backdrop fade show"
                />
            </>
        );
    }
    return null;
}

export default ActionFadeDrop;
