import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from './navigation';
import Message from './message';
import { APIUrl } from '../App';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        
        return (
            <div>
                <div className="custom-navbar">
                    <NavBar />
                </div>
                <div className="row">
                    <div className="col-4 ">
                      LEFT
                    </div>

                    <div className="col-8 items">
                        RIGHT
                    </div>
                </div>
                

            </div>
        );
    }
}
