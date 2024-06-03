import React, {useEffect} from 'react';
import {HashRouter} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'reactstrap/lib/Spinner';
import {
    setIsMobile
} from '@core/state/Session/actions';
import ActionFadeDrop from '@components/ActionFadeDrop';
import {setI18N} from '@core/state/common/actions';
import ToastMessage from '@components/ToastMessage';

import map from 'lodash/map';
import Header from './header';
import Router from './Router';

import ErrorBoundary from './ErrorBoundary';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setI18N('es'));
    }, []);

    useEffect(() => {
        dispatch(setIsMobile());
    }, []);

    const isLoading = useSelector(state => state.session.loading);
    const isMobile = useSelector(state => state.session.getIsMobile);

    if (isLoading) {
        return (
            <HashRouter>
                <ErrorBoundary>
                    <main>
                        <div className="mx-auto my-auto">
                            {map([
                                'primary',
                                'secondary',
                                'success',
                                'danger',
                                'warning'
                            ], color => (
                                <Spinner
                                    type="grow"
                                    color={color}
                                    style={{
                                        width: isMobile ? '.5rem' : '3rem', height: isMobile ? '.5rem' : '3rem'
                                    }}
                                    className="border border-dark ml-4"
                                />
                            ))}
                        </div>
                    </main>
                </ErrorBoundary>
            </HashRouter>
        );
    }

    return (
        <HashRouter>
            <Header/>
            <ErrorBoundary>
                <ActionFadeDrop/>
                <ToastMessage/>
                <Router/>
            </ErrorBoundary>
            {/* <Footer/> */}
        </HashRouter>
    );
};

export default App;
