import React, { Component } from 'react';
import './ViewPeople.css';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';
class Profile extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  static contextTypes = {
    router: PropTypes.object,
  }
  handlePlayQuiz= (event)=> {
    event.preventDefault();
    this.context.router.history.push("/PlayQuiz");
  }
  render() {
    const name = UserProfile.getName();
    if(name==="")
    {
      return (
        <div className="Error">
          <h2>You are denied access to this page.</h2>
        </div>
      )
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{"Hello " + name}</h1>
        </header>
        <br></br>
        <br></br>
        <button onClick={this.handlePlayQuiz}>Play Quiz</button>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default Profile;
