const { default: mongoose } = require("mongoose");


async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log('db is connnected')
}
module.exports = connectDB