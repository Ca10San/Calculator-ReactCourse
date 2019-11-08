import React from 'react';
import './Button.css';

export default props =>
    <button 
        className={`
            button
            ${props.operator ? 'operator' : ''}
            ${props.double ? 'double' : ''}
            ${props.triple ? 'triple' : ''}
        `}
        onClick={
            event => props.click(props.label)
        }
    >
        {props.label}
    </button>
