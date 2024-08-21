const mongoose = require('mongoose')

const conncetToDB = async (url) => {
    mongoose.connect(url)
        .then(() => "Connection established")
        .then((err) => console.log(err));

}

module.exports = conncetToDB