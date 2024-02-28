// const app = require('./app');
import connectToDB from '../server1/configs/dbConn.js';
import app from './app.js'
// const {config} = require('dotenv');
import {config} from 'dotenv';
config();


const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await connectToDB();
    console.log(`App is running at http:localhost:${PORT}`);
})