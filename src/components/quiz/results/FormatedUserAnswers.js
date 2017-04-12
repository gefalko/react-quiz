import React from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';

class FormatedUserAnswer extends React.Component{
    
    constructor(props){
        super(props);
        this.state = { 
            step:1,
            userAnswers: []
        };
    }

   setStyle(index, userAnswer, correctAnswer){


        const red = {
            color:'red'
        };

        const green = {
            color:'green'
        };

        if(index == correctAnswer)return green;

        if(userAnswer == index && userAnswer !== correctAnswer) return red;

        return null;
    }



    render(){
        const { question, options, userAnswer, correctAnswer } = this.props.data;

        const styles = {
            correctStyle:{
                color:'green'
            },
            notCorrectStyle:{
                color:'red'
            }   
        }
        
        const optionsList = options.map((option, index)=>{
            return(
                <div style={this.setStyle(index, userAnswer, correctAnswer)}>{option}</div>
            )
        });


        const orCorrect = (userAnswer == correctAnswer);
        
        return(
            <div style={{ paddingBottom: '15px' }}>
                <div style={orCorrect ? styles.correctStyle : styles.notCorrectStyle}> 
                    {this.props.step}] {question}
                    {orCorrect ? <FontIcon value='done' /> : <FontIcon value='clear' />}
                </div>
                <div style={{paddingTop: '5px'}}>
                    {optionsList}
                </div>    
            </div>
        )
    }

}


class UserScore extends React.Component{

    render(){
        return(
            <div style={{fontWeight:'bold', paddingBottom:'15px'}}>
                You score {this.props.score} from {this.props.total}! 
            </div>
        )
    }
}

export default class FormatedUserAnswers extends React.Component{

    constructor(props){
        super(props);
     
        this.state = { 
            userScore:0,
        };
    }

    componentDidMount(){
       fetch(`/api/answers`)
            .then(responce => responce.json())
            .then(answers => this.countSetAndSave(answers, this.props.userAnswers))
    } 

    countSetAndSave(quizAnswers, userAnswers){

        const formatedUserAnswers = this.props.quizData.map((question, index) =>{

            const data = {
                options:question.options,
                question: question.question,
                userAnswer: userAnswers[index],
                correctAnswer: quizAnswers[index]
            }
            
            if(data.userAnswer === data.correctAnswer)this.state.userScore++;

            return <FormatedUserAnswer step={index+1} data={data}/>
        });

        this.setState({userAnswers:formatedUserAnswers});

        this.saveResult({
            user: this.props.user,
            score: this.state.userScore
        })

    }
    
    saveResult(score){
        fetch('/api/save/score', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(score)
        })
    }    

    render(){
        return(
            <div>
                <UserScore score={this.state.userScore} total={this.props.quizData.length} /> 
                <div>{this.state.userAnswers}</div>
            </div>
        )
    };
}
