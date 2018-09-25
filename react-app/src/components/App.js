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
import Leaderboard from './Leaderboard';
import LeaderboardGenre from './LeaderboardGenre';
import LeaderboardOverall from './LeaderboardOverall';
import LeaderboardQuiz from './LeaderboardQuiz';
import LeaderboardQuizDisp from './LeaderboardQuizDisp';
import Hist from './Hist';
import PlayQuiz from './PlayQuiz';
import UserProfile from './UserProfile';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
        username:"",
      };
  }
  componentDidMount (){
    const name = UserProfile.getName();
    this.setState({username:name});  
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
                  {/* {this.state.username === "admin" && */}
                    <ul className="nav navbar-nav">
                      <li><Link to={'/AdminPanel'}>Administrator Panel</Link></li>
                    </ul>
                  {/* } */}
                  {/* {this.state.username === "" && */}
                    <ul className="nav navbar-nav">
                      <li><Link to={'/SignUp'}>Sign Up</Link></li>
                      <li><Link to={'/LogIn'}>Log In</Link></li>
                    </ul>
                  {/* } */}
                  {/* {this.state.username !== "" && */}
                    <ul className="nav navbar-nav">
                      <li><Link to={'/Hist'}>History</Link></li>
                      <li><Link to={'/Leaderboard'}>LeaderBoard </Link></li>
                      <li><Link to={'/Logout'}>Log Out</Link></li>
                    </ul>
                  {/* } */}
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
                 <Route path='/PlayQuiz/:id' component={QuizQuestions} />
                 <Route exact path='/Profile' component={Profile} />
                 <Route exact path='/Logout' component={Logout} />
                 <Route path='/EditQuiz/:id' component={EditQuiz} />
                 <Route path='/ViewQuizzes' component={ViewQuizzes} />
                 <Route path='/EditQuestion/:id' component={EditQuestion} />
                 <Route path='/Leaderboard' component={Leaderboard} />
                 <Route path='/LeaderboardQuiz/:id' component={LeaderboardQuizDisp} />
                 <Route path='/LeaderboardGenre' component={LeaderboardGenre} />
                 <Route path='/LeaderboardOverall' component={LeaderboardOverall} />
                 <Route path='/LeaderboardQuiz' component={LeaderboardQuiz} />
                 <Route path='/Hist' component={Hist} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
