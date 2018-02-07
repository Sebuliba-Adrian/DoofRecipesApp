import React from 'react';
import { Link } from 'react-router-dom';
export default function Footer({ message, link, linkText }) {
    return (
        <div className="card mt-2">
            <div className="card-block">
                <p className="card-text text-center message">
                    {message}
                    <Link to={link} className="card-link">{linkText}</Link>
                </p>
            </div>
        </div>
    );
}