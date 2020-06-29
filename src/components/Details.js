import React from 'react';
import './Details.css';
import {
    Container,
    Row,
    Col,
    Button,
    Alert
} from 'react-bootstrap';
import {
    useHistory,
    withRouter,
    Redirect
} from 'react-router-dom';

class Details extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            numberOfPlayers: 2,
            displayNameInput: false,
            playersNames: ['', ''],
            showAlert: false,
        };
        this.displayNameInput = this.displayNameInput.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.startGame = this.startGame.bind(this);
        this.createPlayers = this.createPlayers.bind(this);
    }

    displayNameInput() {
        var player_names = this.state.playersNames;
        if(this.state.numberOfPlayers > 1) {
            for(let i = 0; i < this.state.numberOfPlayers; i++) {
                player_names[i] = '';
            }
            this.setState({
                displayNameInput: true,
                showAlert: false,
                playersNames: player_names
            })
        }
        else {
            this.setState({
                showAlert: true,
            })
        }
        console.log(this.state.numberOfPlayers);
    }

    createPlayers(name, position) {
        var names = this.state.playersNames;
        names[position] = name.target.value;
        this.setState({
            playersNames: names
        })
        console.log("The player Names are:",this.state.playersNames );
    }

    renderInput() {
        let renderPlayerInputs = [];
        let countOfPlayers = this.state.numberOfPlayers;
        for(let i = 0; i < countOfPlayers; i++) {
            renderPlayerInputs.push (
                <Container>
                    <Row className={"row_display"}>
                        <Col className={"heading"}>Enter Player Name {parseInt(i)+1}:</Col>
                        <Col> <input type={"text"} className={"text_input"} placeholder={"Enter Player Name"} onBlur={(e)=>this.createPlayers(e, i)}/> </Col>
                    </Row>
                </Container>
            )
        }
        return renderPlayerInputs;
    }

    startGame() {
        let players_count = this.state.playersNames.length;
        if(this.state.playersNames !== []) {
            if (parseInt(this.state.numberOfPlayers) == parseInt(players_count) && parseInt(this.state.numberOfPlayers) > 1) {
                let history = useHistory;
                // const history = createHashHistory();
                this.props.history.push('/rummy/in-game', {playersNames: this.state.playersNames});
                // return (<Redirect to="/rummy/in-game" /> )
            }
            else {
                this.setState({
                    showAlert: true
                })
            }
        }
        else {
            this.setState({
                showAlert: true,
            });
        }
    }

    render() {
        console.log("name is:", this.state.playersNames);
        return (
            <div className="main">
                <div className="homeBackground">
                    <h1 className={"heading"}> Real Game Starts </h1>
                    {this.state.showAlert ?
                        <div>
                            <Alert variant={'warning'}>
                                Please enter all players names and number of players should be greater than 1.
                            </Alert>
                        </div> :
                        <div>

                        </div>
                    }
                        <div className={"score_entry_form"}>
                            <Container>
                                <Row>
                                    <Col><h3 className={"heading"}> Enter number of Players: </h3></Col>
                                    <Col> <input type={"number"} min={"2"} max={"15"} className={"text_input"}
                                                 value={this.state.numberOfPlayers}
                                                 onChange={(e) => this.setState({numberOfPlayers: e.target.value})}
                                                 onSubmit={this.displayNameInput}/> </Col>
                                </Row>
                            </Container>
                                {!this.state.displayNameInput ?
                                    <div className={"buttonCloseHolderDetails"}>
                                        <Button onClick={this.displayNameInput}
                                                className={"buttonClose"}> SUBMIT </Button>
                                    </div> :
                                    <div className={"score_entry_form"}>
                                        <h3 className={"heading"}>Player Count: {this.state.numberOfPlayers}</h3>
                                        {this.renderInput()}
                                        <div className={"start_game_holder"}>
                                            <Button onClick={this.startGame} className={"start_game"}> START GAME </Button>
                                        </div>
                                    </div>
                                }
                   {/* {this.state.showAlert ?
                        <Alert variant={'warning'} style={{position: 'absolute', bottom: 30, left: 80}}>
                            Please enter all players names.
                        </Alert> :
                        <div>
                        </div>
                    }*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Details);
