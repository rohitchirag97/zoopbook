const mongoose = require('mongoose');

const CompanySettingSchema = new mongoose.Schema({
    currency: {
        type: String,
    },
    SalesInvoicePrefix: {
        type: String,
    },
    SalesInvoiceSuffix: {
        type: String,
    },
    SalesInvoiceStartNumber: {
        type: Number,
    },
    SalesInvoiceTitle: {
        type: String,
    },
    financialYear: {
        type: String,
    },
    PanCard: {
        type: String,
    },
    GSTIN: {
        type: String,
    },
    byerabdshipperseprate: {
        type: Boolean,
        default: false
    },
    defaultBankAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankAccount'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }
});

module.exports = mongoose.model('CompanySetting', CompanySettingSchema);