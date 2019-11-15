import React from 'react';
import QRSection from './components/QRSection/index';
import RegriSection from './components/RefriSection/index';
import FrequencyCalendar from './components/FrequencyCalendar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <RegriSection />
          </Route>
          <Route path="/qr_scan" exact>
            <QRSection />
          </Route>
          <Route path="/calendar" exact>
            <FrequencyCalendar />
          </Route>
        </Switch>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/qr_scan">QR scan</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
          </ul>
        </nav>
      </Router>
    </div>
  );
}

export default App;
