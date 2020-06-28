import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
// import Navbar from "./components/Navbar";
import List from "./views/List";
import {Home} from "./views/Home";

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/all/:type" component={List} />
            </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
