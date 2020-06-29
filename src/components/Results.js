import React from 'react';
import './Results.css';
import {
    useHistory,
    withRouter,
    Redirect
} from 'react-router-dom';
import {
    Table
} from 'react-bootstrap';

class Results extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerScore: this.props.location.state.playerScore,
            winner: this.props.location.state.winner,
            rank: this.props.location.state.rank
        }
    }

    componentWillMount() {
        var rank = this.state.rank;
        var display_rank = rank.push(this.state.winner).reverse;
        this.setState({
            rank: display_rank,
        })
    }

    render() {
        console.log("rank is:", this.state.rank, this.state.winner, this.state.playerScore);
        return(
            <div>
                <div className={"homeBackground"}>
                    <h1>Results</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <h1>Rank</h1>
                                </th>
                                <th>
                                    <h1>Player Name</h1>
                                </th>
                            </tr>
                            <tbody>
                                <tr>
                                    {this.state.rank.map((value, index) =>{
                                            return (
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{value}</td>
                                                </tr> )}
                                    )}
                                </tr>
                            </tbody>
                        </thead>
                    </Table>
                </div>
            </div>
        )
    }
}

export default withRouter(Results);
