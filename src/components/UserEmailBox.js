import React from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

export default class UserEmail extends React.Component{

    constructor(props) {
        super(props)
        this.state = {};
    }

    handleEmailChange = (value) => {
        this.setState({email: value});
    }  

    onSubmit = (event) => {
        event.preventDefault();
        this.props.submitHandler(this.state.email);
    }

    render(){
        return(
            <div>
                <form style={{width: '300px'}} onSubmit={this.onSubmit}>
                    <div style={{right: '15px', position: 'relative'}}>
                        <Input  type="email" value={this.state.email} label="Email" onChange={this.handleEmailChange} icon='email' />
                    </div>    
                    <Button style={{float: 'right'}} type="submit" label='BEGIN'/>
                </form>
            </div>
        )
    }
}
