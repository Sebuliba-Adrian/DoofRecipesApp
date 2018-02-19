import React from 'react';
import { Link } from 'react-router-dom';

let NavBar = (prop) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <Link to="/dashboard" className="navbar-brand logo">
                        <h3>Doof!</h3>
                    </Link>
                </div>
                <div className="col-md-4">
                    <input
                        className="form-control mr-sm-2 search-box"
                        type="text"
                        placeholder="Search"
                        
                    />
                    <input
                        className="btn btn-primary"
                        type="button"
                        placeholder="Search"
                        onClick={prop.search}
                    />
                </div>
                <div className="col-md-4 text-right logo ">
                    <a className="nav-link" href="#">
                        {localStorage.getItem('username')} <span className="fa fa-sign-out" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
