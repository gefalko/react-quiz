import React from 'react';
import AllScores from './AllScores';
import FormatedUserAnswers from './FormatedUserAnswers';

export default class Results extends React.Component{
    
    constructor(props){
        super(props);
        this.state = { 
            showAllScores : false
        };
    }

    showScores = () =>{
        this.setState({showAllScores:true});;
    }
    
    hideScores = () =>{
        this.setState({showAllScores:false});
    }

    render(){
        
    const links = this.state.showAllScores ? 
                <a href="javascript:void(0)" onClick={this.hideScores}> Show my answers </a> : <a href="javascript:void(0)" onClick={this.showScores}> Show all scores </a>

        const content = this.state.showAllScores ? 
                <AllScores /> : <FormatedUserAnswers user={this.props.user} quizData={this.props.quizData} userAnswers={this.props.userAnswers}/>;

        return(
            <div>
                <div style={{textDecoration: 'underline', paddingBottom:'25px'}}>{links}</div>
                <div>{content}</div>
            </div>
        )
    }

}
