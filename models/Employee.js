/**
 * Created by john.nana on 11/9/2016.
 */
var rekuire = require("rekuire"),
    mongoose = rekuire("database"),
    crypto = require("crypto"),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    name: { type: String, required: true },
    phone:{ type: String },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase:true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    address:{ type: String },
    kname: { type: String},
    kphone:{ type: String },
    kemail:{ type: String },
    kaddress:{ type: String },
    sname: { type: String},
    sphone:{ type: String },
    semail:{ type: String },
    saddress:{ type: String },
    pname: { type: String},
    pphone:{ type: String },
    pemail:{ type: String },
    paddress:{ type: String },
    spname: { type: String},
    spphone:{ type: String },
    spemail:{ type: String },
    spaddress:{ type: String }

});


module.exports = mongoose.model('Employee', EmployeeSchema);

