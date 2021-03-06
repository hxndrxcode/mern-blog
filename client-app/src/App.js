import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RootProvider from "./context/rootContext";
import Header from "./layouts/header";
import Sidebar from "./layouts/sidebar";
import Routes from "./route/Routes";
import Wrapper from "./layouts/wrapper";
import Footer from "./layouts/footer";

const App = () => {
  return (
    <BrowserRouter>
      <RootProvider>
        <Wrapper>
          <Header />
          <div className="row" style={{ 'marginTop': '75px' }}>
            <div className="col-12 col-lg-3">
              <Sidebar />
            </div>
            <div className="col-12 col-lg-9" style={{minHeight: '75vh'}}>
              <Switch>
                <Route component={Routes} />
              </Switch>
            </div>
          </div>
          <Footer />
        </Wrapper>
      </RootProvider>
    </BrowserRouter>
  )
}
export default App;