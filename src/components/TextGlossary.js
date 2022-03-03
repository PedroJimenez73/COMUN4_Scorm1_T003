import React from 'react';
import { useState } from 'react';
import eye from '../img/icons/eye.svg'

const TextGlossary = (props) => {
  const [isGTOpen, setIsGTOpen] = useState(false);
    
  const toggleGT = () => {
    setIsGTOpen(prev => !prev)
  } 
  
    return(
      <>
        <div className="gt__container" onClick={ toggleGT } >
           <a className="gt__title">{props.title}</a>
           <img className="gt__img"  alt="Glosario" src={eye} ></img> 
        </div>

        <div className={ isGTOpen ? 'popup__black' : 'popup__black--closed' } onClick={ toggleGT } ></div>
        <div className={ isGTOpen ? 'popup__container' : 'popup__container--none'} onClick={ toggleGT }>
          <div className='popup' onClick={ toggleGT }>
              <div id="close" className="popup__close" onClick={ toggleGT }> 
                <span className='bar first-bar'></span>
                <span className='bar third-bar'></span>
              </div>
              <h2 className="title">{ props.title }</h2>
              <p className="text--glossary">{ props.text }</p>
          </div>
        </div>

      </>
        
    )
}
export default TextGlossary;