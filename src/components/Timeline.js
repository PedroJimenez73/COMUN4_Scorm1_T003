import React from 'react';
import Paragraph from './Paragraph';


const Timeline = (props) => (
  <div className="timeline"
  style={props.position ? {gridArea: props.position}: null}>
    <ul>
      {props.children.map((c, index)=>
      <li key={(index+1)}>
        <div className="content">
          <h2>
            <time className="title">{c.year}</time>
          </h2>
          {c.text.map((t, tindex)=><Paragraph text={t} key={`${index+1}.${tindex+1}`}></Paragraph>)}
        </div>
      </li>
      )}
    </ul>
  </div>
)

export default Timeline;