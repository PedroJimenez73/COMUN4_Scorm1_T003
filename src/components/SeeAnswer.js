import React from 'react';
import { useState } from 'react';

const SeeAnswer = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
        setIsOpen( prev => !prev )
    } 


    return(
        <div className="see-answer"
        style={props.position ? {gridArea: props.position}: null}>
            <div className="tb-title__container">
            {!isOpen && <h4 className='tb-title tb-title--selected' onClick={toggleAnswer}>Ver respuesta</h4>}
            {isOpen && <h4 className='tb-title'  onClick={toggleAnswer}>Ocultar respuesta</h4>}
            </div>
            <div className={isOpen ? 'tb-content' : 'hidden'}>
                <div className="text" >
                    <p className="text"  dangerouslySetInnerHTML={{ __html: props.text}}></p>
                    <div className="tb-img__container">
                        { props.image ?
                        <img className="tb-img" src={ props.image } alt=""></img>
                            : null
                        }
                    </div>
                </div> 
            </div>
        </div>
        )
}


export default SeeAnswer;