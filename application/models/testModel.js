const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A name must be there'],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'An image cover must be there']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }, 
});

const Tour = new mongoose.model('Test', tourSchema);

module.exports = Tour

