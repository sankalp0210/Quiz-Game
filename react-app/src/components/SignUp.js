import React, { Component } from 'react';
import './SignUp.css';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: "",
        password: "",
      },
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
  componentDidMount() {
    const name = UserProfile.getName();
    if(name!=="")
    {
      this.context.router.history.push("/Profile");
    }
  }
  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/people', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
        this.context.router.history.push("/LogIn");}
        else if(response.status >= 300 && response.status < 350){
          this.setState({ error: true });
          this.setState({ errorMsg: "username already exists" });
        }
        else{
          this.setState({ error: true });
          this.setState({ errorMsg: "Fields Cannot be left empty" });  
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
          <h1 className="App-title">Sign Up</h1>
        </header>
        <br/><br/>
        {this.state.error &&
          <div className="Error">
            <p>
              {""+this.state.errorMsg}
            </p>
          </div>
        }
        <br></br>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>username</label>
                <input type="username" className="form-control" value={this.state.username} onChange={this.handleUChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
