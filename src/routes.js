import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Product from './components/Product/Product';
import Inventory from './components/Inventory/Inventory';
import AddItem from './components/AddItem/AddItem';
import Orders from './components/Orders/Orders';
import Cart from './components/Cart/Cart';

export default <Fragment>
    <Route exact path="/" component={Home}/>
    <Route path="/search" component={Search}/>
    <Route path="/product/:id" component={Product}/>
    <Route path="/inventory" component={Inventory}/>
    <Route path="/additem" component={AddItem}/>
    <Route path="/orders" component={Orders}/>
    <Route path="/cart" component={Cart}/>
    </Fragment>