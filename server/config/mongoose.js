var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

mongoose.connect('mongodb://localhost/ishi', {}, (err) => {
    if(err){
        console.log('========================');
        console.log('Mongoose Connection Error:', err);
        console.log('========================');
    }
    else{
        console.log('Successfully connected to MongoDB @ localhost');
    }
})
var models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach((file) => {
    if(file.indexOf('.js') >= 0){
        require(models_path + '/' + file);
    }
})