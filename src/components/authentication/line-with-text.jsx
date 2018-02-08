import React from 'react';
import '../../static/style/line-with-text.css';

function LineWithText({ lineText }) {
    return (
        <div className="line-with-text font-weight-bold mb-4">
            <div className="line" />
            <div className="line-text">{lineText}</div>
            <div className="line" />
        </div>
    );
}

export default LineWithText;
