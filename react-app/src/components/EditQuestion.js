import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile';
class ViewQuizzes extends Component {
  constructor() {
    super();
    this.state = {
      data:{
        quizid: 1,
        Statement:"",
        Type:"Multiple Correct",
        optA:"",
        optB:"",
        optC:"",
        optD:"",
        ansA:"",
        ansB:"",
        ansC:"",
        ansD:"",
      },
      selectedOption: null,
      add:null,
    }
  }
  static contextTypes = {
    router: PropTypes.object,
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    let id = this.props.match.params.id;
    const request = new Request('http://127.0.0.1:8080/question/'+id);
    fetch(request)
    .then(response => response.json())
    .then(data => this.setState({data: data}));
  }
  handleSubmit= (event)=> {
    event.preventDefault();
    let id = this.props.match.params.id;
    fetch('http://localhost:8080/editquestions/'+id, {
     method: 'POST',
     body: JSON.stringify(this.state.data),
    })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          this.context.router.history.push("/EditQuiz/"+this.state.data.quizid);
            // window.location.reload();
        }
      });
  }
  handleSChange=(event)=> {
    let y = { ...this.state.data, "Statement": event.target.value };
    this.setState({ data: y });
  }
  handleTChange=(event)=> {
    let y = { ...this.state.data, "Type": event.target.value };
    this.setState({ data: y });
  }
  handleAChange=(event)=> {
    let y = { ...this.state.data, "optA": event.target.value };
    this.setState({ data: y });
  }
  handleBChange=(event)=> {
    let y = { ...this.state.data, "optB": event.target.value };
    this.setState({ data: y });
  }
  handleCChange=(event)=> {
    let y = { ...this.state.data, "optC": event.target.value };
    this.setState({ data: y });
  }
  handleDChange=(event)=> {
    let y = { ...this.state.data, "optD": event.target.value };
    this.setState({ data: y });
  }
  handleaAChange=(event)=> {
    let y = { ...this.state.data, "ansA": event.target.value };
    this.setState({ data: y });
  }
  handleaBChange=(event)=> {
    let y = { ...this.state.data, "ansB": event.target.value };
    this.setState({ data: y });
  }
  handleaCChange=(event)=> {
    let y = { ...this.state.data, "ansC": event.target.value };
    this.setState({ data: y });
  }
  handleaDChange=(event)=> {
    let y = { ...this.state.data, "ansD": event.target.value };
    this.setState({ data: y });
  }
  render=()=> {
    const name = UserProfile.getName();
    if(name!=="admin")
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
          <h1 className="App-title">Edit Question</h1>
        </header>
        <form onSubmit = {this.handleSubmit}>
        {/* {this.state.formData.map((this.state.data, key) =>{ */}
          {/* return ( */}
          {/* <div> */}
            <div className="form-group">
            <label>Statement</label>
            <input type="text" className="form-control" onChange={this.handleSChange} value = {this.state.data.Statement}/>
            </div>
            <div className="form-group">
              <label>Type</label>
              <select onChange={this.handleTChange} value={this.state.data.Type}>
                <option value="Single Correct">Single Correct</option>
                <option value="Multiple Correct">Multiple Correct</option>
                <option value="Image">Image</option>
              </select>
            </div>
            <div className="form-group">
            <label>Option A</label>
            <input type="text" className="form-control" onChange={this.handleAChange} value = {this.state.data.optA}/>
            </div>
            <div className="form-group">
            <label>Option B</label>
            <input type="text" className="form-control" onChange={this.handleBChange} value = {this.state.data.optB}/>
            </div>
            <div className="form-group">
            <label>Option C</label>
            <input type="text" className="form-control" onChange={this.handleCChange} value = {this.state.data.optC}/>
            </div>
            <div className="form-group">
            <label>Option D</label>
            <input type="text" className="form-control" onChange={this.handleDChange} value = {this.state.data.optD}/>
            </div>
            <div className="form-group">
            <label>Answer A</label>
            <input type="text" className="form-control" onChange={this.handleaAChange} value = {this.state.data.ansA}/>
            </div>
            <div className="form-group">
            <label>Answer B</label>
            <input type="text" className="form-control" onChange={this.handleaBChange} value = {this.state.data.ansB}/>
            </div>
            <div className="form-group">
            <label>Answer C</label>
            <input type="text" className="form-control" onChange={this.handleaCChange} value = {this.state.data.ansC}/>
            </div>
            <div className="form-group">
            <label>Answer D</label>
            <input type="text" className="form-control" onChange={this.handleaDChange} value = {this.state.data.ansD}/>
            </div>
          <button>Submit</button>
            {/* </div> */}
            {/* ) */}
          {/* })} */}
          </form>
        </div>
    );
  }
}

export default ViewQuizzes;
