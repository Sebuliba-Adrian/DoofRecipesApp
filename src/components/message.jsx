import React from 'react';

export default function Message({ message }) {
    return (
        <div className={'message alert text-center alert-dismissible fade show alert-info'} role="alert">
         <button
                type="button"
                className="close fa fa-close align-middle"
                data-dismiss="alert"/>
            {message}
        </div>
    );
}