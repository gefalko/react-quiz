import React from 'react';
import Options from './Options';

export default class Question extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {};
    }

    optionsChangeHandle = (value) => {
        this.props.optionsChangeHandle(value);
    }

    render(){
        const {options, question} = this.props.data;

        return(
            <div>
                <div style={{padding:'20px 0px', fontWeight:'bold'}}>{question}</div>
                <Options options={options} changeHandle={this.optionsChangeHandle}/>
            </div>
        )
    }
}
