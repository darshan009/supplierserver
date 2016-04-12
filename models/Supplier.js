var mongoose = require('mongoose');

var supplierSchema = new mongoose.Schema({
    id : Number,
    category : String,
    company : String,
    about : String,
    web : String,
    type : String,
    address : String,
    country : String,
    phone : String,
    fax : String,
    contactperson : String,
    designation : String,
    email : String,
    logo : String,
    year : String,
    employees : String,
    turnover : String,
    source : String
});

module.exports = mongoose.model('Supplier', supplierSchema);
