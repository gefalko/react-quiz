import React from 'react';
import Button from 'react-toolbox/lib/button';
import Question from './question/Question'
import Results from './results/Results';

// stateless reacreat to static
class Step extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        
        const style = {
            padding: '10px 0px'
        }

        return(
            <div style={style}>
                Question {this.props.step} of {this.props.total}
            </div>
        )
    }

}


export default class Quiz extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            step:1,
            userAnswers: []
        };
    }

    optionsChangeHandle = (value) => {
        this.state.userAnswers[this.state.step-1] = parseInt(value);
        console.log("option change ", this.state);
    }

    componentDidMount(){

      fetch(`/api/quiz`)
            .then(responce => responce.json())
            .then(data => this.setState({quizData:data}))
            .catch(error => console.log(err));

    }

    nextStep = () =>{
        console.log("Next step");
        this.setState({step: (this.state.step+1)});
    }

    render(){

        if(!this.state.quizData)return(<div></div>);
        
        if(this.state.step > this.state.quizData.length)
            return(<Results quizData={this.state.quizData} user={this.props.user} userAnswers={this.state.userAnswers}/>)
            
        return(
            <div>
                <Step step={this.state.step} total={this.state.quizData.length} />
                <div style={{padding:'0px 0px 25px'}}>
                    <Question
                        data={this.state.quizData[this.state.step-1]}
                        optionsChangeHandle={this.optionsChangeHandle}
                    />
                </div>
                <Button icon='fast_forward' onClick={this.nextStep} label='next' raised />
            </div>
        )
    }
}
