var mongoose = require('mongoose');
require('../models/hito'); // replace model with your model.js file name
const Hito = mongoose.model('Hito') // replace Model with model name

module.exports = {
    // route functions here
    // example
    index: (req, res) => {
        Hito.find({}, (err, data) => { // replace Model with model name above
            if(err){
                res.json({message: 'Error', error: err});
            }
            else{
                res.json({message: 'Success', result: data});
            }
        })
    },
    // CRUD function examples
    // create: POST - /models
    create: (req, res) => {
        Hito.create(req.body, (err, data) => {
            if(err){
                res.json({message: 'Error', error: err});
            }
            else{
                res.json({message: 'Success', result: data});
            }
        })
    },
    // read: GET - /models/:id
    read: (req, res) => {
        Hito.findByID(req.params.id, (err, data) => {
            if(err){
                res.json({message: 'Error', error: err});
            }
            else{
                res.json({message: 'Success', result: data});
            }
        })
    },
    // update: PUT - /models/:id
    update: (req, res) => {
        Hito.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {runValidators: true, context: 'query'}, 
            
            (err, data) => {
            if(err){
                res.json({message: 'Error', error: err});
            }
            else{
                res.json({message: 'Success', result: data});
            }
        })
    },
    // destroy: DELETE - /models/:id
    destroy: (req, res) => {
        Hito.findByIdAndDelete(req.params.id, (err, data) => {
            if(err){
                res.json({message: 'Error', error: err});
            }
            else{
                res.json({message: 'Success', result: data});
            }
        })
    },
}