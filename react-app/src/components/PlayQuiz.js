import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
class PlayQuiz extends Component {
    constructor() {
        super();
        this.state = {
            data:[],
            selectedOption: null,
        }
    }

    static contextTypes = {
        router: PropTypes.object,
    }
    componentDidMount (){
        const request = new Request('http://127.0.0.1:8080/quizzes/science');
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
 
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.selectedOption!=null){
            this.context.router.history.push("/PlayQuiz/" + this.state.selectedOption);
        }
    }
    handleGChange = (event) => {
        event.preventDefault();
        this.setState({selectedOption:null});
        const request = new Request('http://127.0.0.1:8080/quizzes/'+event.target.value);
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
    }
    handleChange =(event)=> {
        this.setState({ selectedOption: event.target.value });
    }
    render() {
    const name = localStorage.getItem("username");
        if (name === null) {
            return (
                <div className="Error">
                    <h2>You are denied access to this page.</h2>
                </div>
            )
        }

    let change = this.handleChange;
    return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Select Quiz</h1>
                </header>
                <br></br>
                <br></br>
                <div className="formContainer">
                    <form onSubmit = {this.handleSubmit}>
                        <div className="form-group">
                            <label>Genre</label>
                            <select onChange={this.handleGChange} value={this.state.value}>
                                <option value="science">Science</option>
                                <option value="sports">Sports</option>
                                <option value="tv series">TV Series</option>
                                <option value="gk">General Knowledge</option>
                            </select>
                        </div>
                        <div className="Error">

                            <table className="table-hover">
                                <thead>
                                    <tr>
                                    <th>Name</th>
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>{this.state.data.map(function(item, key) {
                                    return (
                                        <tr key = {key}>
                                            <td>{item.Name}</td>
                                            <td><input type = "radio" name = "bt" value = {item.id} onChange = {change}/></td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <br></br>
                            <button>Play</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default PlayQuiz;
