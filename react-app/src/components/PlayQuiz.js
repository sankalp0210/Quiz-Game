import React, { Component } from 'react';
import './ViewPeople.css';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';
class PlayQuiz extends Component {
    constructor() {
        super();
        this.state = {
            genre:"",
            data:[],
            selectedOption: null,
            display:false,
        }
    }

    static contextTypes = {
        router: PropTypes.object,
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.selectedOption!=null){
            this.context.router.history.push("/PlayQuiz/" + this.state.selectedOption);
        }
    }
    handleGChange = (event) => {
        event.preventDefault();
        this.setState({display:true});
        this.setState({selectedOption:null});
        const request = new Request('http://127.0.0.1:8080/quizzes/'+event.target.value);
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
    }
    handleChange =(event)=> {
        this.state.selectedOption = event.target.value;
    }
    render() {
        const name = UserProfile.getName();
        if (name !== "admin") {
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
                    <h1 className="App-title">Administrator Panel</h1>
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
                        {this.state.display &&
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
                        }
                    </form>
                </div>
            </div>
        );
    }
}

export default PlayQuiz;
