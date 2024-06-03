import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Home from '@pages/Home';
import NotFoundPage from '@pages/NotFoundPage';
import { getRoutes } from '@helpers';
import fromState from '@selectors';
import ProductForm from 'pages/Product/form';
import ProductList from 'pages/Product/list';
import ProductView from 'pages/Product/view';
import OrderForm from 'pages/Order/form';
import OrderList from 'pages/Order/list';
import OrderView from 'pages/Order/view';
import OrderResume from 'pages/Order/resume';
import OrderSuccess from 'pages/Order/success';

const productRoutes = getRoutes('product');
const orderRoutes = getRoutes('order');

const Router = () => {
    const location = useLocation();
    const interactiveMode = location.pathname === '/order/view';
    const isMobile = useSelector(fromState.Session.getIsMobile);
    return (
        <main
            style={{
                paddingLeft: isMobile || interactiveMode ? 0 : 80
            }}
        >
            <Switch>
                <Route exact path={orderRoutes.edit} component={OrderForm} />
                <Route exact path={orderRoutes.form} component={OrderForm} />
                <Route exact path={orderRoutes.list} component={OrderList} />
                <Route exact path={orderRoutes.view} component={OrderView} />
                <Route exact path={orderRoutes.resume} component={OrderResume} />
                <Route exact path={orderRoutes.success} component={OrderSuccess} />
                <Route exact path={productRoutes.edit} component={ProductForm} />
                <Route exact path={productRoutes.form} component={ProductForm} />
                <Route exact path={productRoutes.list} component={ProductList} />
                <Route exact path={productRoutes.view} component={ProductView} />
                <Route exact path="/" component={Home} />
                <Route component={NotFoundPage} />
            </Switch>
        </main>
    );
};
export default Router;
