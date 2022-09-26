import React from "react";
const ErrorComponent = ({ error = '' }) => {
    return (
        <div style={{color: 'red'}}>
                { error.length > 1 && ( <h1> { error }</h1>)}
        </div>
    )
}

export default ErrorComponent