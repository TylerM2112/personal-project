const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session');
// const massive = require('massive');
// const checkUserStatus = require('./middlewares/checkUserStatus');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});