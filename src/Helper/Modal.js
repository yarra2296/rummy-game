import React from 'react';
import './Modal.css';
import Image from '../assets/images/close.png';
import {Container, Row, Col, Button} from 'react-bootstrap'

export default class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showInfo: false,
        }
    }

    render() {
        return (
            <div className="info_section_1" id="info_section_1">
                <div className={"bg_image"}>
                    {/*<img src={"Image"} alt="view" className="closeModal" onClick={this.props.closeModal}></img>*/}
                    <h1 className={"header"}>Welcome to Rummy Score Card</h1>
                    <pre className={"header subtitle"}>Information & Guidelines</pre>
                    <p className={"points"}>Points to be remembered before starting the game:</p>
                    <ol className={"points"}>
                        <li> Rummy game is generally played by 2-15 people. </li>
                        <li className={"list_points"}> Decide up on the max. score after which a person might get out. For eg. 200, 250 </li>
                        <li className={"list_points"}> Based on the Top score decided. Fix up on some initial drop score. For eg. 25, 40 </li>
                        <li className={"list_points"}> Based on the Top score decided. Fix up on some Middle drop score. For eg. 50, 60 </li>
                        <li className={"list_points"}> Based on the Top score decided. Decide on the Full Count score. For eg. 60, 80 </li>
                    </ol>
                    <div className={"buttonCloseHolder"}>
                        <Button onClick={this.props.closeModal} className={"buttonClose"}> Play </Button>
                    </div>
                </div>
            </div>
        )
    }
}
