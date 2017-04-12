import React from 'react';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';

export default class Options extends React.Component{

    constructor(props){
        super(props);
        this.state = {value:''};
        this.baseState = this.state;
    }

    componentWillReceiveProps(newProps) {
        this.setState(this.baseState);
    }


    changeHandle = (value)=>{
        this.setState({value:value});
        this.props.changeHandle(value);
    }

    render(){
        const optionsList = this.props.options.map((option, index)=>{
            return (
                <RadioButton
                    value={index+''}
                    label={option}
               />
            )
        });
        

        return(
            <RadioGroup  value={this.state.value} onChange={this.changeHandle} >
                {optionsList}
            </RadioGroup>
        )
    }
}
