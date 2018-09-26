import React, { Component } from 'react';
import './ViewPeople.css';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player'
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
            pass:true,
            show:true,
            score: 0,
            total:0,
            quizName:"",
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
        const request2 = new Request('http://127.0.0.1:8080/quizname/' + id);
        fetch(request2)
        .then(response => response.json())
        .then(data => this.setState({quizName: data}));
    }
    
    handleCheck = () => {
        let y = this.state.data[this.state.index];
        if(this.state.optA === y.ansA && this.state.optB === y.ansB && this.state.optC === y.ansC && this.state.optD === y.ansD)
        this.state.score = this.state.score + 1;
    }
    
    handleNext = (event) => {
        event.preventDefault();
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
    handleShow =(event)=>{
        event.preventDefault();
        let y = this.state.data[this.state.index];
        if(this.state.show)
        {
            this.setState({show:false});
            if(y.ansA === "1")
                this.setState({optA : "1"});
            else if(y.ansB === "1")
                this.setState({optB : "1"});
            else if(y.ansC === "1")
                this.setState({optC : "1"});
            else if(y.ansD === "1")
                this.setState({optD : "1"});
        }
    }
    handlePass =(event)=>{
        event.preventDefault();
        if(this.state.pass)
        {
            let s = this.state.score;
            if(this.state.notFinish)
                this.handleNext(event);
            else if(this.state.finish)
                this.handleFinish(event);
            this.state.score = s + 1;
            this.setState({pass:false});
        }
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
                    <h1 className="App-title">{this.state.quizName}</h1>
                </header>
                <br></br>
                <br></br>
                <div className="formContainer">
                    <form>
                        <div className="Error">
                            <div>
                                {this.state.data && this.state.data.length>0 &&
                                    <div>
                                        {y.Type === "Image" &&
                                            <div>
                                                <h3>Q. Identify ?</h3>
                                                <img className = "img" src = {y.Statement}/>
                                            </div>
                                        }
                                        {y.Type === "Video" &&
                                            <div>
                                                <h3>Q. Identify ?</h3>
                                                <ReactPlayer className = "video" url={y.Statement} playing />
                                            </div>
                                        }
                                        {y.Type !== "Image" && y.Type !== "Video" &&
                                            <h3>Q.   {y.Statement}</h3>
                                        }
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
                                            <br></br>
                                            {(this.state.pass || this.state.show) &&
                                                <p>Lifeline -></p>
                                            }
                                            {this.state.pass &&
                                                <button onClick = {this.handlePass}>Pass this question</button>
                                            }
                                            {this.state.show &&
                                                <button onClick = {this.handleShow}>Show a Correct Answer</button>
                                            }
                                            {!this.state.pass && !this.state.show &&
                                                <p>You don't have any lifelines left.</p>
                                            }
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
                            <br></br>
                            <br></br>
                            <br></br>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuizQuestions;
