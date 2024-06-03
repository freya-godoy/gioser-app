import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import get from 'lodash/get';
import SideNavbar from '@components/SideNavbar';
import {getRoutes} from '@helpers';
import fromState from '@selectors';

const {login} = getRoutes('mainRoutes');
const orderRoutes = getRoutes('order');
const Header = () => {
    const {isAuthenticate, i18n} = useSelector(state => ({
        isAuthenticate: get(state, 'session.isAuthenticate'),
        i18n: fromState.Session.getI18N(state)
    }));
    const isMobile = useSelector(fromState.Session.getIsMobile);
    const location = useLocation();

    if (location.pathname === orderRoutes.view || location.pathname === orderRoutes.resume || location.pathname === orderRoutes.success) {
        return null;
    }

    if (!isAuthenticate) {
        return (<SideNavbar isMobile={isMobile}/>);
    }

    return (
        <header className="p-4 bg-primary">
            <Link to={login} className="float-right">{get(i18n, 'startSession')}</Link>
        </header>
    );
};

export default Header;
