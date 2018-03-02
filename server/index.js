const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session');
const massive = require('massive');
// const checkUserStatus = require('./middlewares/checkUserStatus');
const pc = require('./controllers/products_controller');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
}).catch(error => {
    console.log('massive error', error);
    });



//Products Controller
app.get('/api/products', pc.getAll);
// app.get('/api/products${id}', pc.getSelected);
app.post('/api/products', pc.createProduct);
// app.put('/api/products${id}', pc.updateProduct);
// app.delete('/api/products${id}', pc.deleteProduct);

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});