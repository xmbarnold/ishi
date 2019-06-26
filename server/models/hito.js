var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var HitoSchema = new mongoose.Schema({ // change Model with name of your Model
    // field: { type: Type, validation: [valid, 'Error Message'],}
    // common validations include:
    // required: true
    // unique: true
    // min/max(length): value
}, { timestamps: true });
// unique validation
// again, replace Model with name of your Model, replace message string
HitoSchema.plugin(uniqueValidator, {message: 'Unique validation message here'});

module.exports = mongoose.model('Hito', HitoSchema); // replace Model with Model name