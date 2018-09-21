import React, { Component } from 'react';
import LogIn from './LogIn';
import ViewPeople from './ViewPeople';
import Quizzes from './Quizzes';
import CreateQuiz from './CreateQuiz';
import SignUp from './SignUp';
import AdminPanel from './AdminPanel';
import Home from './Home';
import Profile from './Profile';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>Home</Link>
                </div>
                <ul className="nav navbar-nav">
                  {/* <li><Link to={'/'}>Home</Link></li> */}
                  {/* <li><Link to={'/EditPerson'}>Edit Person</Link></li> */}
                  {/* <li><Link to={'/ViewPeople'}>View People</Link></li> */}
                  <li><Link to={'/AdminPanel'}>Administrator Panel</Link></li>
                  <li><Link to={'/SignUp'}>Sign Up</Link></li>
                  <li><Link to={'/LogIn'}>Log In</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/SignUp' component={SignUp} />
                 <Route exact path='/Quizzes' component={Quizzes} />
                 <Route exact path='/LogIn' component={LogIn} />
                 <Route exact path='/CreateQuiz' component={CreateQuiz} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/AdminPanel' component={AdminPanel} />
                 <Route exact path='/Profile' component={Profile} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
