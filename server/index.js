const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const bcrypt = require('bcrypt');
const checkForSession  = require('./middlewares/checkForSession');
const pc = require('./controllers/products_controller');
const ac = require('./controllers/admin_controller');
const cc = require('./controllers/cart_controller');

const saltRounds = 12;

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
}).catch(error => {
    console.log('massive error', error);
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(checkForSession);

app.use(express.static(`${__dirname}/../build`));

//Products Controller
app.get('/api/products', pc.getAll);
// app.get('/api/product/:id', pc.getSelect);
app.post('/api/products', pc.createProduct);
app.put('/api/products', pc.updateProduct);
app.delete('/api/product/:id', pc.deleteProduct);

//Cart Controller
app.post( '/api/cart', cc.add );
// app.post( '/api/cart/checkout', cc.checkout );
// app.delete( '/api/cart', cc.delete );

//User Controller
app.post('/api/login', ac.loginAdmin);
app.post('/api/logout', ac.logout);
// console.log("HASHED KEY", bcrypt.hash("123", saltRounds).then(res => console.log(res)))

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});