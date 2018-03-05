import React from 'react';
import '../static/style/date-display.css';

export default function DateDisplay({date}) {
  
    return (
        <div className="card text-center date-display">
            <div className="card-header text-white bg-primary">
                {date.substring(7, 11)}
            </div>
            <div className="card-text"><h4>{date.substring(4, 7)}</h4></div>
            <div className="card-footer">{date.substring(11, 16)}</div>
        </div>
    );
}
