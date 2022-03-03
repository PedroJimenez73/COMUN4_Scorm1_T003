import React from 'react';
import question from '../img/icons/question.png'
import SeeText from './SeeText';

const Question = (props) => (
    <div className="question__container"
    style={props.position ? {gridArea: props.position}: null}>
        <img className="question__img" src={ question } alt="Interrogación"/>
        {props.text.map((t,i) => <p key={i} className="text" dangerouslySetInnerHTML={{ __html: t}}></p>)}
        {!!props.image && <div className="slider16__question-img__container">
            <img className="slider16__question-img" src={ props.image } alt=""></img>
        </div>}
        {!!props.see && <SeeText isOpen={false} text={props.see.text} title={props.see.title} />}
    </div>
    );
    


export default Question;
