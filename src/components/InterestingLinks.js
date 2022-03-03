import React from 'react';
import Paragraph from './Paragraph';

const InterestingLinks = (props) => (
    <div className="il__container"
    style={props.position ? {gridArea: props.position}: null}>
        <ul>
            {props.children.map(c => 
            <a href={c.link} target="_blank" rel="noopener noreferrer">
                <li className="il__element">
                    <h5 className="subtitle subtitle--il">{c.title}</h5>
                    <Paragraph text={c.text}></Paragraph>
                    <p className="text link__text">{c.link}</p>
                </li>
            </a>)}
        </ul>
    </div>
    );
    


export default InterestingLinks;