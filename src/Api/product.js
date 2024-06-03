import {
    PRODUCT as API
} from './Urls';

import CRUD from './crud';

class Product extends CRUD {
    constructor() {
        super(API);
    }
}

export default new Product();
