import React from "react";
import { BrowserRouter as Router, Redirect, Link, Switch, Route } from "react-router-dom"

function k()
{
    return <Router>
        Hello world
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Switch>
            <Route path='/' exact><Redirect to='/home' /></Route>
            <Route path='/home' exact>Home</Route>
            <Route path="/about">About</Route>
        </Switch>
    </Router>
}

class Kapp extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            show: true
        };
    }

    clicker = async () =>
    {
        await new Promise(res => setTimeout(() =>
        {
            res();
        }, 1000))

        this.setState({
            show: !this.state.show
        });
    }

    render()
    {
        return <div>
            <button onClick={this.clicker}>Show / Hide</button>
            {this.state.show ? <div>Show</div> : <div>Hide</div>}
        </div>
    }
}

export default Kapp;