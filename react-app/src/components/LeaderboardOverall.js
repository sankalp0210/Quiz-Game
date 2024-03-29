import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
class LeaderBoardOverall extends Component {
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
    const request = new Request('http://127.0.0.1:8080/leaderboard/overall');
    fetch(request)
    .then(response => response.json())
        .then(data => this.setState({data: data}));
    }

  render=()=> {
    const name = localStorage.getItem("username");
    if(name===null)
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
          <h1 className="App-title">Overall Leaderboard</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Quiz Name</th>
              <th>Genre</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.Name}</td>
                      <td>{item.genre}</td>
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

export default LeaderBoardOverall;
