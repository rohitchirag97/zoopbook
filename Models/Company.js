const Mongoose = require('mongoose');

const ComanySchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nameSlug: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    pincode: {
        type: String
    },
    telephone: {
        type: String
    },
    mobile: {
        type: String
    },
    Fax: {
        type: String
    },
    Email: {
        type: String
    },
    Website: {
        type: String
    },

});

module.exports = Mongoose.model('Company', ComanySchema);