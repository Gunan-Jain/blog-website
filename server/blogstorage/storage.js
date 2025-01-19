const mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
        await mongoose.connect("mongodb+srv://techno:techno12@blogstorage.lh2j9.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1); // Exit process if unable to connect
    }
};

module.exports = connectToMongo;
