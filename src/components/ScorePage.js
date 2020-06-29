import React from 'react';
import './ScorePage.css';
import {
    useHistory,
    withRouter,
    Redirect
} from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Button,
    Table, Alert
} from 'react-bootstrap';

class ScorePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialDrop: 20,
            middleDrop: 40,
            fullCount: 80,
            maxScore: 200,
            showTable: false,
            showScore: false,
            playerScore: [],
            presentScore: [],
            showAlert: false,
            showWinner: false,
            rank: [],
            winner: '',
        };
        this.startGame = this.startGame.bind(this);
        this.enterScores = this.enterScores.bind(this);
        this.addScore = this.addScore.bind(this);
        this.setScore = this.setScore.bind(this);
        this.displayScoreCard = this.displayScoreCard.bind(this);
        this.startNewGame = this.startNewGame.bind(this);
        this.results = this.results.bind(this);
        this.printPage = this.printPage.bind(this);
    }

    componentDidMount() {
        var count = this.props.location.state.playersNames.length;
        var playersScore = this.state.playerScore;
        var presentScore = this.state.presentScore;
        for(let i = 0; i < count; i++) {
            playersScore.push({
                "player_name" : this.props.location.state.playersNames[i],
                "player_score": [],
                "total_score": 0,
                "out": false,
                "winner": false,
                "rank": 0,
            });
            presentScore.push(0);
        }
        this.setState({
            playerScore: playersScore,
            presentScore: presentScore
        })
    }

    enterScores(score) {
        if(score == 100) {
            this.setState({
                intialDrop: 15,
                middleDrop: 25,
                fullCount: 30,
                maxScore: 100,
                showScore: true
            });
        }
        else if(score == 200) {
            this.setState({
                initialDrop: 20,
                middleDrop: 40,
                fullCount: 80,
                maxScore: 200,
                showScore: true
            })
        }
        else if(score == 250) {
            this.setState({
                initialDrop: 25,
                middleDrop: 40,
                fullCount: 80,
                maxScore: 250,
                showScore: true
            })
        }
        else {
            this.setState({
                initialDrop: '',
                middleDrop: '',
                fullCount: '',
                maxScore: '',
                showScore: true,
            })
        }
    }

    startGame() {
        let history = useHistory;
        if(this.state.maxScore !== '' && this.state.maxScore !== "0" && this.state.initialDrop !== '' && this.state.initialDrop !== "0" && this.state.middleDrop !== '' && this.state.middleDrop !== "0" && this.state.fullCount !== '' && this.state.fullCount !== "0") {
            if((parseInt(this.state.maxScore) > parseInt(this.state.fullCount)) && parseInt(this.state.fullCount) > parseInt(this.state.middleDrop) && parseInt(this.state.middleDrop) > parseInt(this.state.initialDrop) && parseInt(this.state.initialDrop) > 0) {
                this.setState({
                    showTable: true,
                });
            }
            else {
                alert("Please enter all scores in ascending order i.e; initial drop, middle drop, full count, max. score!");
            }
        }
        else {
            alert("Please enter all scores which should be greater than 0 & not empty!");
        }
    }

    addScore() {
        var full_score = this.state.playerScore;
        var present_score = this.state.presentScore;
        var count = this.state.presentScore.length;
        var rank = this.state.rank;
        if(this.state.presentScore.indexOf(0) !== -1 && this.state.presentScore.every(el => parseInt(el) <= parseInt(this.state.fullCount)) && this.state.presentScore.every((el => parseInt(el) >=0))) {
            for (let i = 0; i < count; i++) {
                var preset_rank = rank.length;
                full_score[i].player_score.push(parseInt(present_score[i]));
                var value = parseInt(full_score[i].total_score) + parseInt(present_score[i]);
                full_score[i].total_score = value;
                if(full_score[i].total_score > parseInt(this.state.maxScore) && full_score[i].out !== true) {
                    full_score[i].out = true;
                    full_score[i].rank = full_score.length - preset_rank;
                    rank.push(full_score[i].player_name);
                }
            }
            for(let k = 0; k < count; k++) {
                if(rank.length == full_score.length-1 && full_score[k].rank == 0) {
                    full_score[k].winner = true
                    this.setState({
                        winner: full_score[k].player_name
                    })
                }
            }
            for(let j = 0; j < count; j++) {
                present_score[j] = 0;
            }
            this.setState({
                presentScore: present_score,
                playerScore: full_score,
                showAlert: false,
                rank: rank,
            });
        }
        else {
            this.setState({
                // presentScore: [],
                showAlert: true,
            })
        }
    }

    setScore(score, index) {
        var present_score = this.state.presentScore;
        present_score[index] = parseInt(score.target.value);
        // var full_score = this.state.playerScore;
        // full_score[index].player_score.push(score.target.value);
        this.setState({
            // playerScore: full_score,
            presentScore: present_score
        })
    }

    displayScoreCard(index) {
        let return_players_score = [];
        for(let i = 0; i < this.state.playerScore.length ; i++) {
            console.log("index, i are:", i, index);
            return_players_score.push(<td> {this.state.playerScore[i].player_score[index]} </td>)
        }
        return return_players_score;
    }

    startNewGame() {
        let history = useHistory;
        this.props.history.push('/rummy')
    }

    results() {
        let history = useHistory;
        this.props.history.push('/rummy/results', {playerScore: this.state.playerScore, winner: this.state.winner, rank: this.state.rank})
    }

    printPage() {
        window.print();
    }

    render() {
        console.log("name is:", this.state.playerScore, this.state.presentScore);
        return (
            <div className={"main"}>
                <div className={"homeBackground"}>
                    {!this.state.showTable ?
                        <div>
                            <h1 className={"Score_header"}>Enter Game Scores</h1>
                            <Row className={"score_button_entry"}>
                                <Col> <Button onClick={()=>this.enterScores(100)} className={"start_game_new"}> 100 </Button> </Col>
                                <Col> <Button onClick={()=>this.enterScores(200)} className={"start_game_new"}> 200 </Button> </Col>
                                <Col> <Button onClick={()=>this.enterScores(250)} className={"start_game_new"}> 250 </Button> </Col>
                                <Col> <Button onClick={()=>this.enterScores("custom")} className={"start_game_new"}> Enter scores</Button> </Col>
                            </Row>
                            <Container className={"side_heading_container"}>
                                <Row className={"content_row"}>
                                    <Col className={"side_headings"}> Max. Game Score: </Col>
                                    <Col> <input type={"number"} value={this.state.maxScore} className={"text_input1"}
                                                 min={0} max={1000}
                                                 onChange={(e) => this.setState({maxScore: e.target.value})} /> </Col>
                                    <Col></Col>
                                </Row>
                                <Row className={"content_row"}>
                                    <Col className={"side_headings"}> Initial Drop: </Col>
                                    <Col> <input type={"number"} value={this.state.initialDrop}
                                                 className={"text_input1"} min={15} max={100}
                                                 onChange={(e) => this.setState({initialDrop: e.target.value})} /> </Col>
                                    <Col></Col>
                                </Row>
                                <Row className={"content_row"}>
                                    <Col className={"side_headings"}> Middle Drop: </Col>
                                    <Col> <input type={"number"} value={this.state.middleDrop} className={"text_input1"}
                                                 min={20} max={150}
                                                 onChange={(e) => this.setState({middleDrop: e.target.value})} /> </Col>
                                    <Col></Col>
                                </Row>
                                <Row className={"content_row"}>
                                    <Col className={"side_headings"}> Full Count: </Col>
                                    <Col> <input type={"number"} value={this.state.fullCount} className={"text_input1"}
                                                 min={20} max={150}
                                                 onChange={(e) => this.setState({fullCount: e.target.value})} /> </Col>
                                    <Col></Col>
                                </Row>
                            </Container>
                            <div className={"start_game_holder"}>
                                <Button onClick={this.startGame} className={"start_game_new"}> START GAME </Button>
                            </div>
                        </div> :
                        <div className={"score_display_page"}>
                            <h1 className={"Score_header_second_page"}> Enjoy Game and Be the winner !!! All the best </h1>
                            <p className={"sub_header"}> Initial Drop: {this.state.initialDrop} </p>
                            <p className={"sub_header"}> Middle Drop: {this.state.middleDrop} </p>
                            <p className={"sub_header"}> Full Count: {this.state.fullCount} </p>
                            {this.state.showAlert ?
                                <Alert variant={'warning'}>
                                    Please enter all players score or keep at-least one winner(0).
                                </Alert> :
                                <div>

                                </div>
                            }
                            {this.state.winner !== '' ?
                                <div className={"d-flex justify-content-center align-items-center column"}>
                                    <h1>SUPERB, {this.state.winner} is the winner of the game!!</h1>
                                    <Button onClick={this.results}> Results Page </Button>
                                    <Button onClick={this.startNewGame}> New Game </Button>
                                    <Button onCick={this.printPage()}>Download Score card</Button>
                                </div> :
                                <div>

                                </div>
                            }
                             <div className={"table_container"}>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>
                                                <Button onClick={this.addScore} className={"start_game_new"}> ADD </Button>
                                            </th>
                                            {this.state.playerScore.map((name, index) => {
                                                return (
                                                    <th>
                                                        {this.state.playerScore[index].out !== true ?
                                                            <th>
                                                                <input type={"number"} placeholder={"Enter Score"}
                                                                       className={"text_input1"}
                                                                       defaultValue={this.state.presentScore[index]}
                                                                       key={index}
                                                                       min={0} max={this.state.fullCount}
                                                                       onBlur={(score) => this.setScore(score, index)}/>
                                                                {this.state.playerScore[index].winner ?
                                                                    <p className={"winner_text"}>CONGRATULATIONS!!! {this.state.playerScore[index].player_name} is the winner</p> :
                                                                    <p></p>
                                                                }
                                                            </th> :
                                                            <th>
                                                                <input type={"number"}
                                                                       className={"text_input1"}
                                                                       placeholder={"Game Ended"}
                                                                       key={index} disabled={true}/>
                                                                <p className={"out_text"}>You are out!!</p>
                                                            </th>
                                                        }
                                                    </th>)
                                            }) }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Names</td>
                                            {this.state.playerScore.map((data, index)=>{
                                                return (<td>{data.player_name}</td>)
                                            })}
                                        </tr>
                                        {this.state.playerScore[0].player_score.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td> <p>{index+1}</p> </td>
                                                    {this.displayScoreCard(index)}
                                                </tr> )
                                        })
                                        }
                                        <tr>
                                            <td> Total </td>
                                            {this.state.playerScore.map((value, position)=>{
                                                console.log("value of:", value, position);
                                                return (<td>{(value.total_score).toString()}</td>)
                                            })}
                                        </tr>
                                        <tr>
                                            <td> Score left </td>
                                            {this.state.playerScore.map((data, index)=>{
                                                return (<td>{(this.state.maxScore - parseInt(data.total_score)).toString()}</td>)
                                            })}
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(ScorePage)
