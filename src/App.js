import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter} from 'react-router-dom';

import './App.css';

import Footer from '../src/components/Footer/Footer';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Product from './components/Product/Product';
import AddItem from './components/AddItem/AddItem';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';

class App extends Component {
  render() {
    return (
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/product/:id" component={Product} />
            <Route path="/additem" component={AddItem} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
          </Switch>
        <Footer />
      </div>
    );
  }
}


function mapStateToProps(state) {

  return {
    state
  };
}

export default withRouter(connect(mapStateToProps)(App));