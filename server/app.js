const express = require('express')
const port = process.env.PORT || 3000
const dotenv = require('dotenv')
const cors = require('cors');
const conncetToDB = require('./DB/connection')
const cookieParser = require('cookie-parser');


dotenv.config();

const app = express()
conncetToDB(process.env.DB_URL)


const userRoutes = require('./routes/user');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/user', userRoutes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))