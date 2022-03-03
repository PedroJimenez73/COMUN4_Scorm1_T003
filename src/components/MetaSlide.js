import React from 'react';
import arrow from '../img/icons/arrow.svg'
import { useState } from 'react';
import Paragraph from './Paragraph';
import UnorderedList from './UnorderedList';

const MetaSlide = (props) => {
    const [currentMetaSlide, setCurrentMetaSlide] = useState(0);

    const prevMetaSlide = () => {
        setCurrentMetaSlide(currentMetaSlide - 1)
    }
    const nextMetaSlide = () => {
        setCurrentMetaSlide(currentMetaSlide + 1)
    }

    return (
        <div className="meta-slide__container">
            <div className="meta-slide__image">
                <div className="meta-slides">
                        <div className="meta-slide__background">
                            {!!currentMetaSlide &&
                                <button className="meta-slide__button" onClick={prevMetaSlide}>
                                    <img src={arrow} alt="anterior" style={{transform: 'rotate(180deg)'}}></img>
                                </button>
                            }

                            <div className="meta-slide">
                                {/* {props.slides[currentMetaSlide].text.map((t, ti) => <p className="text" key={`child-metaslide-` + ti} dangerouslySetInnerHTML={{ __html: t}}></p>)} */}
                                {props.slides[currentMetaSlide].elements.map(el => {
                                    if (el.type === 'paragraph') {
                                        return <Paragraph text={el.text}></Paragraph>
                                    } else if (el.type === 'list') {
                                        return <UnorderedList list={el.list}/>
                                    }
                                })}
                            </div>

                            {(currentMetaSlide < props.slides.length - 1) &&
                                <button className="meta-slide__button" onClick={nextMetaSlide}>
                                    <img src={arrow} alt="siguiente"></img>
                                </button>
                            }
                        </div>
                </div>
            </div>
        </div>

    )
}


export default MetaSlide;