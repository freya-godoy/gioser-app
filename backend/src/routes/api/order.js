const {OrderController} = include('controllers');

const registerAction = require('../middleWares/registerAction');

const termKeys = ['name', 'entity'];

module.exports = router => {
    router
        .route('/:id')
        .get((req, res, next) => OrderController.fetchOneByParams(req, res, next, termKeys))
        .put((req, res, next) => OrderController.saveOne(req, res, next))
        .delete((req, res, next) => OrderController.deleteOne(req, res, next));
    router
        .route('/')
        .get((req, res, next) => OrderController.fetch(req, res, next, termKeys))
        .post((req, res, next) => OrderController.saveOne(req, res, next));
    return router;
};
