import React, { Component } from 'react';
import './ViewPeople.css';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';
class Profile extends Component {
  constructor() {
    super();
    this.state = {
    }
    this.handleQuiz = this.handleQuiz.bind(this);
    this.handleUsers = this.handleUsers.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  handleUsers= (event)=> {
    event.preventDefault();
    console.log("users");
    this.context.router.history.push("/ViewPeople");
  }
  
  handleQuiz= (event)=> {
  event.preventDefault();
    console.log("quizzes");
    this.context.router.history.push("/Quizzes");
  }
  
  render() {
    const name = UserProfile.getName();
    if(name==="")
    {
      return (
        <div className="Error">
          {/* <p>{"bt"+name}</p> */}
          <h2>You are denied access to this page.</h2>
        </div>
      )
    }
    return (
      <div className="App">
        {/* <p>{"dsv"+name}</p> */}
        <header className="App-header">
          <h1 className="App-title">{"Hello " + name}</h1>
        </header>
        <br></br>
        <br></br>
        {/* <button onClick={this.handleQuiz}>Quizzes</button> */}
        <br></br>
        <br></br>
        {/* <button onClick={this.handleUsers}>Users</button> */}
      </div>
    );
  }
}

export default Profile;
