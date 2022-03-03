import React from 'react';
import quote from '../img/icons/quote.svg'
import parse from 'html-react-parser';
import Paragraph from './Paragraph';

const Quote = (props) => (
    <div style={props.position ? {gridArea: props.position}: null}>
        <div className="quote__container">
            <img className="quote__img" src={ quote } alt="Cita"/>
            {/* <Paragraph text={props.text}></Paragraph> */}
            <p className="quote__text">{parse(props.text)}</p>
            <p className="quote__author">{props.author}</p>
        </div>
    </div>
    );
    
export default Quote;
