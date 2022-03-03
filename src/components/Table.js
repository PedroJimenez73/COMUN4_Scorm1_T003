import React from 'react';
import { useState } from 'react';
import Paragraph from './Paragraph';
import parse from 'html-react-parser';

const Table = (props) => {
    const [currentCell, setCurrentCell] = useState(1);

    const toggleTab = (index) => setCurrentCell(index)

    return(
        <div className="table"
        style={props.position ? {gridArea: props.position}: null}>
            <div className="tb-title__container">
                {props.children.map((c, index)=>
                <h4 key={`header_${(index+1)}`} className={currentCell === (index+1) ? 'tb-title tb-title--selected' : 'tb-title'}  onClick={()=>toggleTab(index+1)} label={index+1}>
                    {c.title}
                </h4>
                )}
            </div>
            <div className="tb-content">
                {
                // props.children[(currentCell - 1)].style === 'text'? 

                    props.children[(currentCell - 1)].text.map((t, index) => {
                        return (
                                <div key={`content_${(index+1)}`} >
                                    <Paragraph  text={t}></Paragraph>
                                </div>
                        )
                        })
                // : 
                // <ul>
                //     {
                //     props.children[(currentCell - 1)].text.map((t, index) => {
                //         return (
                //             <div key={`content_${(index+1)}`} >
                //                 <li className='text'>{parse(t)}</li>
                //             </div>
                //         )
                //         })
                //     }
                // </ul>
                }
            </div>    
        </div>
        )
}


export default Table;