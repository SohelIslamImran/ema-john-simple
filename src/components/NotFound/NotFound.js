import React from 'react';
import pageNotFound from '../../images/pageNotFound.jpg';
import './NotFound.css'

const NotFound = () => {
    return (
        <div className="notfoundImg">
            <img src={pageNotFound} alt="" />
        </div>
    );
};

export default NotFound;