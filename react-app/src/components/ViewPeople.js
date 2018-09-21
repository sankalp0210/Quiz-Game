import React, { Component } from 'react';
import './ViewPeople.css';
import UserProfile from './UserProfile';
class ViewPeople extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    const name = UserProfile.getName();
    if(name!="asankalp9@gmail.com")
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
          <h1 className="App-title">View All Users</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>email</th>
              <th>Name</th>
              <th>User Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.email}</td>
                      <td>{item.Name}</td>
                      <td>{item.username}</td>
                      <td></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default ViewPeople;
