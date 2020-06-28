import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Detail from "./components/Detail";
import List from "./views/List";
import {Home} from "./views/Home";

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/all/:type" component={List} />
                <Route path="/detail/:id" component={Detail} />
            </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
