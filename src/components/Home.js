import React from 'react';
import './Home.css';
import Modal from "../Helper/Modal";
import {
    Redirect,
    useHistory,
    withRouter
} from "react-router-dom";

class Home extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showInfo: true,
        }
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        let history = useHistory;
        this.setState({
            showInfo: false,
        });
        this.props.history.push('/rummy/start-game');
    }

    render() {
        return (
            <div className="main">
                <div className="homeBackground1">
                    <h1 className={"heading"}> Rummy Score Card </h1>
                    <div className='info_section'>
                        {this.state.showInfo ? <Modal closeModal={this.closeModal} /> : <div></div> }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);
