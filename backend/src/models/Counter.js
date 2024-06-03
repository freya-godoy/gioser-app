const mongoose = require('mongoose');
const {
    Schema,
    model
} = mongoose;

const {Types: {ObjectId}} = mongoose;

const CounterSchema = Schema({
    _id: ObjectId,
    type: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
}, {collection: 'counter'});

CounterSchema.statics.getLastSeq = async function(type) {
    const data = await this.findOneAndUpdate({type}, {$inc: {seq: 1}});
    if (!data) {
        await this.insertMany([
            {
                _id: ObjectId(),
                type,
                seq: 1
            }
        ]);
        return 1;
    }

    return data.seq + 1;
};

module.exports = model('Counter', CounterSchema);
