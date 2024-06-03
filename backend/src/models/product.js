const mongoose = require('mongoose');
const Counter = require('./Counter');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: false,
  },
  status: {
    type: String,
    enum: ['inactive', 'active'],
    default: 'active',
  },
  type: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  coverImage: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  extraData: {
    type: String,
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

ProductSchema.pre('save', async function (next) {
  if (!this._id) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'productId' },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );

    this._id = counter.sequenceValue;
  }
  next();
});

module.exports = mongoose.model('Product', ProductSchema);