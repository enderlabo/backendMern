const { Schema, model } = require("mongoose");


const userMolitaliaSchema = Schema({

    rName: {
        type: String,
        required: true
    },

    rLastName: {
        type: String,
        required: true,
        
    },

    rCode: {
        type: String,
        required: true,
        uniqued: true

    }
});


module.exports = model( 'userMModel', userMolitaliaSchema ); 