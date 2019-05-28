'use strict';

// order schema definition (Active)

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    orderSchema = new Schema({

        userId: {
            type: Schema.Types.ObjectId, ref: 'user'
        },
        subtotal: {
            type: Number, default: 0
        },
        date: {
            type: String, default: Date.now
        },
        status: {
            type: String
            , default: 'ACTIVE', uppercase: true
        }
    }, {
            timestamps: true
        });
module.exports = mongoose.model('order', orderSchema, 'order');

