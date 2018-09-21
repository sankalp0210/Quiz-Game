import React, { Component } from 'react';
import './ViewPeople.css';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';
class CreateQuiz extends Component {
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
    if(name!="asankalp9@gmail.com")
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
        <header className="App-header">
          <h1 className="App-title">Administrator Panel</h1>
        </header>
        <br></br>
        <br></br>
        <p>bt</p>
        {/* <button onClick={this.handleQuiz}>View All Quizzes</button> */}
        <br></br>
        <br></br>
        {/* <button onClick={this.handleQuiz}>Create a new Quiz</button> */}
      </div>
    );
  }
}

export default CreateQuiz;
