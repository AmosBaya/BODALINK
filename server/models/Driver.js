const mongoose = require('mongoose');


const driverSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type:String, required: true},
    email: {type: String, required:true, unique:true},
    phoneNumber:{required:true, unique:true},
    password: {type: String, required:true}
})

module.exports = mongoose.model('Driver', driverSchema);
