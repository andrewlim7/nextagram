import React from 'react';

const Welcome = props => {
    return <h4 style={{color:props.color, fontSize:props.textSize}}>{props.children}</h4>
}

export default Welcome