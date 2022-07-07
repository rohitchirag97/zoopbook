const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    productcode: {
        type: String
    },
    serialnumber: {
        type: String
    },
    producttype: {
        type: String,
        enum: ['Product', 'Service', 'SaaS'],
        default: 'Product'
    },
    hsnsaccode: {
        type: String
    },
    description: {
        type: String
    },
    quantity: {
        type: String
    },
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
    },
    price: {
        type: Number
    },
    igst: {
        type: Number
    },
    cgst: {
        type: Number
    },
    sgst: {
        type: Number
    },
    productcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);