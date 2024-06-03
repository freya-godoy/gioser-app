const {ProductController} = include('controllers');

const registerAction = require('../middleWares/registerAction');

const termKeys = ['name', 'entity'];

module.exports = router => {
    router
        .route('/:id')
        .get((req, res, next) => ProductController.fetchOneByParams(req, res, next, termKeys))
        .put((req, res, next) => ProductController.saveOne(req, res, next))
        .delete((req, res, next) => ProductController.deleteOne(req, res, next));
    router
        .route('/')
        .get((req, res, next) => ProductController.fetch(req, res, next, termKeys))
        .post((req, res, next) => ProductController.saveOne(req, res, next));
    return router;
};
