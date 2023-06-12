const mongoose = require('mongoose');
const connectToMongo = async () =>{
       
        await mongoose.connect('mongodb://127.0.0.1:27017/notebook')
        await mongoose.model('User').findOne();
  
    // const mongoURI = ('mongodb://localhost:27017/notebook');
}
module.exports = connectToMongo;