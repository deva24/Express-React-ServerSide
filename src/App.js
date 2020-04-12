import React, { useState } from "react";
import { StaticRouter as Router, Redirect, Link, Switch, Route } from "react-router-dom"

function k(props)
{
    let { context, url } = props;

    console.log("Url : ", props.url);
    console.log("Ctx : ", context)

    return <Router context={{}} location={url}>
        Hello world
        <ul>
            <li><Link to="/home">HomeLink</Link></li>
            <li><Link to="/about">AboutLink</Link></li>
        </ul>
        <Switch>
            <Route path='/' exact><Redirect to='/home' /></Route>
            <Route path='/home'><div>HomeData</div></Route>
            <Route path="/about"><div>AboutData</div></Route>
        </Switch>
    </Router>
}

function s()
{
    let [tog, setTog] = useState(true);

    return <div>
        Hello World
        <button onClick={() => { setTog(!tog) }}>Show/Hide</button>
        {tog ? <div>Data</div> : null}
        <div>{tog.toString()}</div>
    </div>;
}
export default k;