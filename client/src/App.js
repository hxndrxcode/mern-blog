import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RootProvider from "./context/rootContext";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Routes from "./route/Routes";

const App = () => {
  return (
    <BrowserRouter>
      <RootProvider>
        <Header />
        <div className="row" style={{'marginTop': '75px'}}>
          <div className="col-12 col-lg-3">
            <Sidebar />
          </div>
          <div className="col-12 col-lg-9">
            <Switch>
              <Route component={Routes} />
            </Switch>
          </div>
        </div>
      </RootProvider>
    </BrowserRouter>
  )
}
export default App;