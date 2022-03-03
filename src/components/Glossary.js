import React from 'react';
import { useState } from 'react';
import parse from 'html-react-parser';

const Glossary = (props) => {
  const [currentGT, setCurrentGT] = useState(0);
  
    return(
      <>
        <div className="glossary-mobile__container">
          <ul className="glossary-mobile__list">
          {props.children.map((word, i) =>
            <li key={i}>
              <h5 className="glossary__definitions__title">{parse(word.title)}</h5>
              <p className="text">{parse(word.text)}</p>
            </li>
          )}
          </ul>
        </div>


        <div className="glossary__container">
            <div className="glossary__titles-container">
              <ul>
              {props.children.map((word, i) => 
                <li key={i}  >
                  <h5 className="glossary__title"  onClick={() => setCurrentGT(i)}>{parse(word.title)} </h5>
                </li>
              )}
              </ul>
            </div>
            <div className="glossary__definitions-container">
                <div>
                  <h5 className="glossary__definitions__title">{parse(props.children[currentGT].title)}</h5>
                  <p className="text">{parse(props.children[currentGT].text)}</p>
                </div>
            </div>
        </div>
      </>
        
    )
}
export default Glossary;