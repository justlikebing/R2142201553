import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllTrains from './AllTrains';
import SingleTrain from './SingleTrain';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={AllTrains} />
          <Route path="/train/:trainId" component={SingleTrain} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
