import React from "react";
import { StaticRouter as Router, Redirect, Link, Switch, Route } from "react-router-dom"

function k()
{
    return <Router>
        Hello world
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
        <Switch>
            <Route path='/' exact><Redirect to='/home' /></Route>
            <Route path='/home' exact><div>Home</div></Route>
            <Route path="/about"><div>About</div></Route>
        </Switch>
    </Router>
}

function simple()
{
    return <div>Hello World</div>;
}
export default k;