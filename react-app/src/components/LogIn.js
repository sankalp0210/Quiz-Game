import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LogIn.css';
import GoogleLogin from 'react-google-login';

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: "",
        password: "",
      },
      submitted: false,
      error: false,
      errorMsg: "",
    } 
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  responseGoogle = (response) => {
    this.state.formData.username = response.w3.U3;
    this.state.formData.password = "not required";
    localStorage.setItem("username", this.state.formData.username)
    fetch('http://localhost:8080/people', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
     });
     window.location.reload();
    this.context.router.history.push("/Profile")
  }
  
  componentDidMount() {
    const name = localStorage.getItem("username");
    if(name!==null)
    {
      this.context.router.history.push("/Profile");
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify(this.state.formData),
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          localStorage.setItem("username", this.state.formData.username)
     window.location.reload();
     this.context.router.history.push("/Profile");
        } else {
          this.setState({ error: true });
        }
      });
  }
  handleUChange(event) {
    let y = {...this.state.formData, "username":event.target.value};
    this.setState({formData:y});
  }
  handlePChange(event) {
    let y = {...this.state.formData, "password":event.target.value};
    this.setState({formData:y});
  }
  render() {
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
            <label>Username</label>
            <input type="username" className="form-control" value={this.state.username} onChange={this.handleUChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange} />
          </div>
          <br></br>
          <button>Log In</button>
          <br></br>
          <br></br>
          <GoogleLogin
            clientId="34634838270-qrrefd554nfo901bhqsmtvp5ap47nepc.apps.googleusercontent.com"
            buttonText="Login With Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
          {document.getElementById('googleButton')}
        </form>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default LogIn;
