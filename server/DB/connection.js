const mongoose = require('mongoose')

const conncetToDB = async (url) => {
    mongoose.connect(url)
        .then(() => console.log("Connection established"))
        .catch((err) => console.log(err));

}

module.exports = conncetToDB