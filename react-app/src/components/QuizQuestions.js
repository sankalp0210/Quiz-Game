import React, { Component } from 'react';
import './ViewPeople.css';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';
class QuizQuestions extends Component {
    constructor() {
        super();
        this.state = {
            data:[],
            optA: "0",
            optB: "0",
            optC: "0",
            optD: "0",
            index : 0,
            finish: false,
            notFinish: true,
            result:false,
            score: 0,
            total:0,
            hist:{
                username:"",
                score:"",
                quizid:"",
            }
        }
    }

    static contextTypes = {
        router: PropTypes.object,
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        const request = new Request('http://127.0.0.1:8080/questions/'+ id);
        fetch(request)
        .then(response => response.json())
        .then(data => this.setState({data: data}));
        this.state.hist.quizid = id;
        this.state.hist.username = UserProfile.getName();
    }
    
    handleCheck = () => {
        let y = this.state.data[this.state.index];
        if(this.state.optA === y.ansA && this.state.optB === y.ansB && this.state.optC === y.ansC && this.state.optD === y.ansD)
        // this.setState({score:this.state.score + 1})
        this.state.score = this.state.score + 1;
    }
    
    handleNext = (event) => {
        // event.preventDefault();
        this.state.total = this.state.data.length;
        this.handleCheck();
        this.state.index = this.state.index + 1;
        if(this.state.index === (this.state.data.length-1)) {
            this.setState({finish:true,notFinish:false});
        }
        this.setState({optA:"0",optB:"0",optC:"0",optD:"0"});
    }

    handleFinish = (event) => {
        event.preventDefault();
        this.handleCheck();
        this.state.hist.score = this.state.score.toString();
        this.setState({finish:false});
        this.setState({result:true});
        this.setState({data:null});
        console.log(this.state.score);
        const request = new Request('http://127.0.0.1:8080/hist');
        fetch(request,{
            method: 'POST',
            body: JSON.stringify(this.state.hist),
        });
    }

    chA = (event) => {
        event.preventDefault();
        if(this.state.optA === "0")
            this.setState({optA : "1"});
        else
            this.setState({optA : "0"});
    }
    chB = (event) => {
        event.preventDefault();
        if(this.state.optB === "0")
            this.setState({optB : "1"});
        else
            this.setState({optB : "0"});
    }
    chC = (event) => {
        event.preventDefault();
        if(this.state.optC === "0")
            this.setState({optC : "1"});
        else
            this.setState({optC : "0"});
    }
    chD = (event) => {
        event.preventDefault();
        if(this.state.optD === "0")
            this.setState({optD : "1"});
        else
            this.setState({optD : "0"});
    }

    render() {
        const name = UserProfile.getName();
        if (name === "") {
            return (
                <div className="Error">
                    <h2>You are denied access to this page.</h2>
                </div>
            )
        }
        let y ;
        if(this.state.data)
            y = this.state.data[this.state.index];
        let a = "a";
        let b = "a";
        let c = "a";
        let d = "a";
        if(this.state.optA === "1")
            a = "selectedButton";
        else
            a = "a";
        if(this.state.optB === "1")
            b = "selectedButton";
        else
            b = "a";
        if(this.state.optC === "1")
            c = "selectedButton";
        else
            c = "a";
        if(this.state.optD === "1")
            d = "selectedButton";
        else
            d = "a";
        
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Administrator Panel</h1>
                </header>
                <br></br>
                <br></br>
                <div className="formContainer">
                    <form>
                        <div className="Error">
                            <div>
                                {this.state.data && this.state.data.length>0 &&
                                    <div>
                                        <h3>Q.   {y.Statement}</h3>
                                        <h4>
                                            <br></br>
                                            <br></br>
                                            <button className = {a} onClick = {this.chA}>{y.optA}</button>
                                            <br></br>
                                            <br></br>
                                            <button  className = {b} onClick = {this.chB}>{y.optB}</button>
                                            <br></br>
                                            <br></br>
                                            <button  className = {c} onClick = {this.chC}>{y.optC}</button>
                                            <br></br>
                                            <br></br>
                                            <button  className = {d} onClick = {this.chD}>{y.optD}</button>
                                            <br></br>
                                        </h4>
                                    </div>
                                }
                            </div>
                            <br></br>
                            {this.state.notFinish &&
                                <button className = "next" onClick = {this.handleNext}>Next</button>
                            }
                            {this.state.finish &&
                                <button className = "next" onClick ={this.handleFinish}>Finish</button>
                            }
                            {this.state.result && 
                                <h3>Your Final Score is {this.state.score}/{this.state.total}</h3>
                            }
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuizQuestions;