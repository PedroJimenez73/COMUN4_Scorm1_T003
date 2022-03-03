import React from 'react';
import { useState } from 'react';
import arrow from '../img/icons/arrow.svg'



const CarouselImage = (props) => {

  const [currentCarouselImage, setCurrentCarouselImage] = useState(1);

  const prevCarouselImage = () => {
    setCurrentCarouselImage(  currentCarouselImage-1 )
  } 
  const nextCarouselImage= () => {
    setCurrentCarouselImage( currentCarouselImage+1 )
  } 



  return(
  <div className='carousel__image-container'>
  {currentCarouselImage === 1 ?
      <div className="carousel__image " id="carousel__image">
        {currentCarouselImage !== 1 ?          
          <button className="meta-slide__button" onClick={prevCarouselImage}>
            <img src={ arrow } alt="anterior"></img>
          </button>
          : 
          <button className="meta-slide__button meta-slide__button--none" id="meta-slide__button--none"disabled>
            <img src={ arrow } alt="anterior"></img>
          </button>              }  
          <img  className="carousel__image--1" src={props.image1} alt={props.description1}></img> 
        {currentCarouselImage !== 3 ?   
            <button className="meta-slide__button" onClick={nextCarouselImage}>
                <img src={ arrow } alt="siguiente"></img>
            </button>
            : 
            <button className="meta-slide__button meta-slide__button--none" id="meta-slide__button--none"disabled>
            <img src={ arrow } alt="siguiente"></img>
            </button>}
          </div>
          : ''}



          {currentCarouselImage === 2 ?
              <div className="carousel__image"  id="carousel__image2" >
                  {currentCarouselImage !== 1 ?          
                      <button className="meta-slide__button" onClick={prevCarouselImage}>
                              <img src={ arrow } alt="anterior"></img>
                      </button>
                      : 
                      <button className="meta-slide__button meta-slide__button--none" id="meta-slide__button--none"disabled>
                      <img src={ arrow }alt="anterior"></img>
                      </button>              
                      }
                      <img  className="carousel__image--2" src={props.image2} alt={props.description2}></img>
                  {currentCarouselImage !== 3 ?   
                      <button className="meta-slide__button" onClick={nextCarouselImage}>
                          <img src={ arrow } alt="siguiente"></img>
                      </button>
                      : 
                      <button className="meta-slide__button meta-slide__button--none" id="meta-slide__button--none"disabled>
                      <img src={ arrow } alt="siguiente"></img>
                      </button>
                      }
              </div>
              : ''}

            {currentCarouselImage === 3 ?
              <div className="carousel__image"  id="carousel__image3" >
                  {currentCarouselImage !== 1 ?          
                      <button className="meta-slide__button" onClick={prevCarouselImage}>
                              <img src={ arrow } alt="anterior"></img>
                      </button>
                      : 
                      <button className="meta-slide__button meta-slide__button--none" id="meta-slide__button--none"disabled>
                      <img src={ arrow }alt="anterior"></img>
                      </button>              
                      }
                      <img  className="carousel__image--3" src={props.image3} alt={props.description3}></img>
                  {currentCarouselImage !== 3 ?   
                      <button className="meta-slide__button" onClick={nextCarouselImage}>
                          <img src={ arrow } alt="siguiente"></img>
                      </button>
                      : 
                      <button className="meta-slide__button meta-slide__button--none" id="meta-slide__button--none"disabled>
                      <img src={ arrow } alt="siguiente"></img>
                      </button>
                      }
              </div>
              : ''}



  </div>
  )
}


export default CarouselImage;