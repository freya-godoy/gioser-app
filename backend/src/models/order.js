const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  detail: {
    type: String,
  },
  notes: {
    type: String,
  },
  total: {
    type: Number,
    required: true,
  },
  products: {
    type: Array,
    required: false,
  },
  numberId: {
    type: Number,
  },
  userId: {
    type: Schema.Types.Mixed,
    required: false,
    default: 9999,
  },
  basket: {
    type: Schema.Types.Mixed,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'process', 'done'],
    default: 'pending',
  },
  additionalData: {
    type: Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  __v: {
    type: Number,
    select: false,
  },
});

OrderSchema.pre('save', async function (next) {
  if (!this._id) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'orderId' },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );

    this._id = counter.sequenceValue;
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
