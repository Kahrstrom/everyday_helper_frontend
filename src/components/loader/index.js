import React from 'react';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import './index.css';

export const Loader = (props) => {
    const { scale, id } = props;
    return (
        <div className="loader">
            <CircularProgress id={id} scale={scale} />
        </div>
    );
};
 