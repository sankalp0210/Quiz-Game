import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LogIn.css';
import UserProfile from './UserProfile';
class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        email: "",
        password: "",
      },
      submitted: false,
      error: false,
      errorMsg: "",
    }
    this.handleEChange = this.handleEChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  componentDidMount() {
    const name = UserProfile.getName();
    if(name!="")
    {
      this.context.router.history.push("/Profile");
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/people/', {
      method: 'POST',
      body: JSON.stringify(this.state.formData),
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          UserProfile.setName(this.state.formData.email);
          this.context.router.history.push("/Profile");

        } else {
          this.setState({ error: true });
        }
      }); 
  }

  handleEChange(event) {
    this.state.formData.email = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }
  render() {
    const name = UserProfile.getName();
    // if (name != "") {
    //   return (
    //     <div className="Error">
    //       <h2>You are already logged in.</h2>
    //     </div>
    //   )
    // }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Log In</h1>
        </header>
        {this.state.error &&
          <div className="Error">
            <p>
              Invalid Username or Password.
            </p>
          </div>
        }
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" value={this.state.email} onChange={this.handleEChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange} />
          </div>
          <br></br>
          <button>Log In</button>
        </form>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default LogIn;
