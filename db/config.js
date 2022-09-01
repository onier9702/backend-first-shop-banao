

const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGO_DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        });

        console.log('DataBase connected');
        
    } catch (error) {
        console.log(error);
        console.log('DB not connected');
        // throw new Error('Error opening DataBase');
    }

};

module.exports = {
    dbConnection
}