const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
// const checkUserStatus = require('./middlewares/checkUserStatus');
const checkForSession  = require('./middlewares/checkForSession');
const pc = require('./controllers/products_controller');
// const cc = require('./controllers/cart_controller');

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
    saveUninitialized: true
}));
app.use(checkForSession);

// app.use(express.static('../build'));


//Products Controller
app.get('/api/products', pc.getAll);
// app.get('/api/product/:id', pc.getSelect);
app.post('/api/products', pc.createProduct);
app.put('/api/products', pc.updateProduct);
app.delete('/api/product/:id', pc.deleteProduct);

//cart_controller
// app.post( '/api/cart', cc.add );
// app.post( '/api/cart/checkout', cc.checkout );
// app.delete( '/api/cart', cc.delete );

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});