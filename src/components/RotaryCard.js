import React from 'react';
import { useState } from 'react';
import UnorderedList from './UnorderedList';
import parse from 'html-react-parser';

const RotaryCard = (props) => {
    const [currentRotary, setCurrentRotary] = useState(1);

    const rotate = () => {
        if(currentRotary === 1){
            setCurrentRotary(2)
        }
        if(currentRotary === 2){
            setCurrentRotary(1)
        }
    } 

    return(
        <div className="rotary-card__container" onClick={rotate}>
           <div className={ currentRotary === 1 ? 'rotary-card' : 'rotary-card rotary-card--rotation' }>
               <div className="rotary-card__front">
                    <img className="rotary-card__img" alt="" src={props.img}></img>
                    <h4 className="rotary-card__title">{props.title}</h4>
               </div>
               <div className="rotary-card__back">
                    <>
                    {props.elements ? props.elements.map(el => {
                        if (el.type === 'paragraph') {
                            return <p className="rotary-card__text">{parse(el.text)}</p>
                        } else if (el.type === 'list') {
                            return <UnorderedList list={el.list}/>
                        }
                    }) : null}
                    {props.text ? <p className="rotary-card__text">{parse(props.text)}</p> : null }
                    </>                   
               </div>
           </div>
        </div>
    )
}


export default RotaryCard;