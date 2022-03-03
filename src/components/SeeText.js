import React from 'react';
import { useState } from 'react';
import Paragraph from './Paragraph';
import parse from 'parse-json';

const SeeText = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleText = () => {
        setIsOpen( prev => !prev )
    } 


    return(
        <div className="see-answer">
            <div className="tb-title__container">
                <h4 className={isOpen ? 'tb-title tb-title--selected' : 'tb-title'}  onClick={toggleText}>
                   {props.title}
                </h4>
            </div>
            <div className={isOpen ? 'tb-content' : 'hidden'}>
                {props.text.map(t => <Paragraph text={parse(t)}></Paragraph>)}
            </div>
        </div>
        )
}


export default SeeText;