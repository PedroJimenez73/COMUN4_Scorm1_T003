import React from 'react';


const Bibliography = (props) => (
    <div className="bibliography__container"
    style={props.position ? {gridArea: props.position}: null}>
        <ul>
        {props.children.map(c => <li className="text" dangerouslySetInnerHTML={{ __html: c}}></li>)}
        </ul>
    </div>
    );
    

export default Bibliography;