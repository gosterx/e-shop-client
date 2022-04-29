import './App.css';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {useSelector} from "react-redux";
import Checkout from "./pages/Checkout";
import AdminNewProduct from "./pages/admin/AdminNewProduct";
import Admin from "./pages/Admin";
import AdminNewCategory from "./pages/admin/AdminNewCategory";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import {Badge} from "@material-ui/core";
import {BuildOutlined} from "@material-ui/icons";
import React, {Fragment} from "react";

const App = () => {
    const user = useSelector(state => state.user.currentUser)

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/products/:category">
                    <ProductList/>
                </Route>
                <Route path="/product/:productId">
                    <Product/>
                </Route>
                <Route path="/cart">
                    <Cart/>
                </Route>
                <Route path="/login">
                    {user ? <Redirect to="/"/> : <Login/>}
                </Route>
                <Route path="/register">
                    {user ? <Redirect to="/"/> : <Register/>}
                </Route>
                <Route path="/checkout">
                    {user ? <Checkout/> : <Redirect to="/"/>}
                </Route>
                <Route path="/admin/newProduct">
                    { user ? (user.role === "admin" ? <AdminNewProduct/> : <Redirect to="/"/> ) : <Redirect to="/"/> }
                </Route>
                <Route path="/admin/newCategory">
                    { user ? (user.role === "admin" ? <AdminNewCategory/> : <Redirect to="/"/> ) : <Redirect to="/"/> }
                </Route>
                <Route path="/admin/orders">
                    { user ? (user.role === "admin" ? <AdminOrders/> : <Redirect to="/"/> ) : <Redirect to="/"/> }
                </Route>
                <Route path="/admin/users">
                    { user ? (user.role === "admin" ? <AdminUsers/> : <Redirect to="/"/> ) : <Redirect to="/"/> }
                </Route>
                <Route path="/admin">
                    { user ? (user.role === "admin" ? <Admin/> : <Redirect to="/"/> ) : <Redirect to="/"/> }
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
