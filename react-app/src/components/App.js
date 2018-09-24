import React, { Component } from 'react';
import LogIn from './LogIn';
import ViewPeople from './ViewPeople';
import Quizzes from './Quizzes';
import CreateQuiz from './CreateQuiz';
import SignUp from './SignUp';
import AdminPanel from './AdminPanel';
import Home from './Home';
import Profile from './Profile';
import Logout from './Logout';
import EditQuiz from './EditQuiz';
import ViewQuizzes from './ViewQuizzes';
import EditQuestion from './EditQuestion';
import QuizQuestions from './QuizQuestions';
import PlayQuiz from './PlayQuiz';
 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
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
                  <li><Link to={'/AdminPanel'}>Administrator Panel</Link></li>
                  <li><Link to={'/SignUp'}>Sign Up</Link></li>
                  <li><Link to={'/LogIn'}>Log In</Link></li>
                  <li><Link to={'/Logout'}>Log Out</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/Quizzes' component={Quizzes} />
                 <Route exact path='/SignUp' component={SignUp} />
                 <Route exact path='/LogIn' component={LogIn} />
                 <Route exact path='/CreateQuiz' component={CreateQuiz} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/AdminPanel' component={AdminPanel} />
                 <Route exact path='/PlayQuiz' component={PlayQuiz} />
                 <Route exact path='/PlayQuiz/:id' component={QuizQuestions} />
                 <Route exact path='/Profile' component={Profile} />
                 <Route exact path='/Logout' component={Logout} />
                 <Route path='/EditQuiz/:id' component={EditQuiz} />
                 <Route path='/ViewQuizzes' component={ViewQuizzes} />
                 <Route path='/EditQuestion/:id' component={EditQuestion} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
