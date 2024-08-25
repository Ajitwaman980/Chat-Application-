const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/chatApplication", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection successful');
    })
    .catch((error) => {
        console.log('Error connecting:', error);
    });
    const messageSchema = new mongoose.Schema({
        username: String,
        message: String,
        timestamp: Date
    });
    const userchats = mongoose.model('userchats', messageSchema);
    module.exports = userchats;