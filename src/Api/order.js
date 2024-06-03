import {
    ORDER as API
} from './Urls';

import CRUD from './crud';

class Order extends CRUD {
    constructor() {
        super(API);
    }
}

export default new Order();
