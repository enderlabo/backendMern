const mongoose = require("mongoose");

const dbInit = async() => {

    try {

        await mongoose.connect( process.env.DB_INIT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true,
        });

        console.log("Db Online.")

    } catch( err ) {
        console.log(err);
        throw new Error('Cant connected to MongoDB');
    }
}

module.exports = {
    dbInit
}