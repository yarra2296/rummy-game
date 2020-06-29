import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Home';
import Details from './Details';
import ScorePage from './ScorePage';
import Results from './Results';

function App() {
  return (
      <div className="App">
          <Router>
              <div>
                  {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                  <Switch>
                      <Route exact path="/rummy">
                          <Home />
                      </Route>
                      <Route
                          exact
                          path="/"
                          render={() => {
                              return (<Redirect to="/rummy" />)
                          }}
                      />
                      <Route path="/rummy/start-game">
                          <Details />
                      </Route>
                      <Route path="/rummy/in-game">
                          <ScorePage />
                      </Route>
                      <Route path="/rummy/results">
                          <Results />
                      </Route>
                  </Switch>

              </div>
          </Router>
      </div>

  );
}

export default App;
