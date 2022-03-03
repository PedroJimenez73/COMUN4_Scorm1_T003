import React from 'react';
import link from '../img/icons/link.svg'

const Quote = (props) => (
    <div className="link__container">
        <img className="link__img" src={ link } alt="Link"/>
        <a className="link__text" target="_blank" href={props.link}> {props.text} </a>
    </div>
    );

export default Quote;
