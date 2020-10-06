
const { Schema, model } = require("mongoose");


const userSchema = Schema({

    name: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        
    },
    address: {
        type: String,

    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,

    }
});


module.exports = model( 'userModel', userSchema ); 