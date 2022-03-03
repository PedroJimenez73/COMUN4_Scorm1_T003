import React from 'react';
import INFO from '../components/objects/InfoObject'
import photo from '../img/main-img.jpg'

const Credits = (props) => (

        <div className="credits"
        style={props.position ? {gridArea: props.position}: null}>
          <div className="credits__info">
              <h3  className="text text--credits">{ INFO.teacher }</h3>
              <h1 className="text text--credits">Universidad Camilo José Cela</h1>
          </div>
          <img className="credits__img" src={ photo } alt=""></img>
        </div>
      );
  
  export default Credits;
  