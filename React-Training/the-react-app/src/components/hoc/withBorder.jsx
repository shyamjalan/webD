import React from 'react';

// HOC is just a function
// arg ==> the component to wrap
const withBorder = (WrappedComponent) => {
    // return a new component - functional/class based
    return (props) => {
        return(
            <div style={{border: "2px solid black"}}>
                <WrappedComponent {...props}/>
            </div>
        );
    }
}

export default withBorder;