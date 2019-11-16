import React from 'react';
import QRSection from './components/QRSection/index';
import RegriSection from './components/RefriSection/index';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <RegriSection />
        </Route>
        <Route path="/qr_scan" exact>
          <QRSection />
        </Route>
      </Switch>
    </>
  );
}

export default App;
