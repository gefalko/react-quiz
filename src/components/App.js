import React from 'react'
import AppBar from 'react-toolbox/lib/app_bar';
import UserEmailBox from './UserEmailBox';
import Quiz from './quiz/Quiz';

export default class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    setUserEmail = (email) => {
        this.setState({email:email});
    }

    render(){
        const content = (this.state.email) ? <Quiz user={this.state.email} /> : <UserEmailBox submitHandler={this.setUserEmail}/>;
        
        return (
            <div>
                <AppBar title='JavaScript quiz' leftIcon='school' />
                <div style={{ margin: '25px', fontFamily: 'Roboto,sans-serif' }} >
                    { content }
                </div>    
            </div>
        )
    }

};
