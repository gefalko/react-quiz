import React from 'react';
import Moment from 'moment';

export default class AllScores extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
       fetch(`/api/scores`)
            .then(responce => responce.json())
            .then(scores => this.setState({scores:scores}))
            .catch(err => console.log(err));
    }

    render(){

        if(!this.state.scores)return <div></div>;

        const scores = this.state.scores.map(score => {
            return (<tr>
                        <td>{score.score}</td>
                        <td style={{padding: '0px 5px'}}>{score.user}</td>
                        <td>{Moment(new Date(score.date)).format('YYYY-MM-DD')}</td>
                    </tr>)
        });

        return(
            <div>
                <table style={{textAlign:'center'}}>
                    <tbody>
                        <tr>
                            <th>Score</th>
                            <th>User email</th>
                            <th>Date</th>
                        </tr>
                        {scores}
                    </tbody>
                </table>
            </div>
        )
    }

}
