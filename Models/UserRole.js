const mongoose = require('mongoose');

const UserRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    aloowedCreateSalesInvoice: {
        type: Boolean,
        default: true
    },
    allowedCreatePurchaseInvoice: {
        type: Boolean,
        default: true
    },
    allowedCreateSalesReturnInvoice: {
        type: Boolean,
        default: true
    },
    allowedCreatePurchaseReturnInvoice: {
        type: Boolean,
        default: true
    },
    allowedCreateSalesOrder: {
        type: Boolean,
        default: true
    },
    allowedCreatePurchaseOrder: {
        type: Boolean,
        default: true
    },
    allowedviewSalesInvoice: {
        type: Boolean,
        default: true
    },
    allowedviewPurchaseInvoice: {
        type: Boolean,
        default: true
    },
    allowedviewSalesReturnInvoice: {
        type: Boolean,
        default: true
    },
    allowedviewPurchaseReturnInvoice: {
        type: Boolean,
        default: true
    },
    allowedviewSalesOrder: {
        type: Boolean,
        default: true
    },
    allowedviewPurchaseOrder: {
        type: Boolean,
        default: true
    },
    allowededitSalesInvoice: {
        type: Boolean,
        default: true
    },
    allowededitPurchaseInvoice: {
        type: Boolean,
        default: true
    },
    allowededitSalesReturnInvoice: {
        type: Boolean,
        default: true
    },
    allowededitPurchaseReturnInvoice: {
        type: Boolean,
        default: true
    },
    allowededitSalesOrder: {
        type: Boolean,
        default: true
    },
    allowededitPurchaseOrder: {
        type: Boolean,
        default: true
    },
    alloweddeleteSalesInvoice: {
        type: Boolean,
        default: true
    },
    alloweddeletePurchaseInvoice: {
        type: Boolean,
        default: true
    },
    alloweddeleteSalesReturnInvoice: {
        type: Boolean,
        default: true
    },
    alloweddeletePurchaseReturnInvoice: {
        type: Boolean,
        default: true
    },
    alloweddeleteSalesOrder: {
        type: Boolean,
        default: true
    },
    alloweddeletePurchaseOrder: {
        type: Boolean,
        default: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
});

module.exports = mongoose.model('UserRole', UserRoleSchema);