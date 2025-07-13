const mongoose = require('mongoose');


const customerSchema = mongoose.Schema({
    firstName: {type:String, required:true},
    lastName:{type: String},
    email:{type: String, required:true, unique:true},
    phoneNumber:{type: Number, required: true, unique:true},
    password: {type: String, required: true}
})

module.exports = mongoose.model('Customer', customerSchema);
