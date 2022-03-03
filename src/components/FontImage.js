import React from 'react';


const FontImage = (props) => (
    <div className='font-img__container' 
        style={props.position ? {gridArea: props.position}: null}>
        <a target="_blank" rel="noopener noreferrer" href={props.linkimage} style={{pointerEvents: !!props.linkimage ? 'inherit': 'none'}}>
            <img className='slider__img' alt={props.definition} src={props.image}></img>
        </a>
        <a target="_blank" rel="noopener noreferrer" className='font-link' href={props.linkpage} style={{pointerEvents: !!props.linkimage ? 'inherit': 'none'}}>{props.text}</a>
   </div>
);
    


export default FontImage;
