import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile';
class LeaderBoardQuizDisp extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      quizName:"",
      selectedOption:null,
    }
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    const request = new Request('http://127.0.0.1:8080/leaderboard/quiz/' + id);
    fetch(request)
    .then(response => response.json())
        .then(data => this.setState({data: data}));
    const request2 = new Request('http://127.0.0.1:8080/quizname/' + id);
    fetch(request2)
    .then(response => response.json())
        .then(data => this.setState({quizName: data}));
    }

  render=()=> {
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
          <h1 className="App-title">Leaderboard of {this.state.quizName}</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>username</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.username}</td>
                      <td>{item.score}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default LeaderBoardQuizDisp;
