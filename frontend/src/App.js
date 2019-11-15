import React from 'react';
import QRSection from './components/QRSection/index';
import RegriSection from './components/RefriSection/index';
import {
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Button, Icon } from 'antd';
import 'antd/dist/antd.css';


function App() {
  let history = useHistory();
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <RegriSection/>
        </Route>
        <Route path="/qr_scan" exact>
          <QRSection/>
        </Route>
      </Switch>
      <nav>
        <Icon type="camera" onClick={() => history.push("/qr_scan")}/>
      </nav>
    </div>
  );
}

export default App;
