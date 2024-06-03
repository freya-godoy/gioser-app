const mainRoutes = {
    home: '/',
    order: '/order',
    product: '/product'
};

export default {
    product: {
        form: `${mainRoutes.product}/form`,
        edit: `${mainRoutes.product}/edit/:id`,
        list: `${mainRoutes.product}/list`,
        view: `${mainRoutes.product}/view/:id`
    },
    order: {
        form: `${mainRoutes.order}/form`,
        edit: `${mainRoutes.order}/edit/:id`,
        list: `${mainRoutes.order}/list`,
        view: `${mainRoutes.order}/view`,
        resume: `${mainRoutes.order}/resume`,
        success: `${mainRoutes.order}/success`
    },
    mainRoutes
};
