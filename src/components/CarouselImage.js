import React from 'react';
import arrow from '../img/icons/arrow.svg'

class CarouselImage extends React.Component {
  state = {
    currentCarouselImage: 0
  }
  
  constructor(props){
    super(props);
    this.setState({ currentCarouselImage: 0 })
  }

  setCurrentCarouselImage = (index) => { this.setState({ currentCarouselImage: index }) }

  prevCarouselImage = () => {
    this.setCurrentCarouselImage(this.state.currentCarouselImage - 1)
  }
  nextCarouselImage = () => {
    this.setCurrentCarouselImage(this.state.currentCarouselImage + 1)
  }
  render() {
    return (
      <div className='carousel__image-container' style={this.props.position ? {gridArea: this.props.position}: null}>
        <div className="carousel__image " id="carousel__image">
          <button className="meta-slide__button prev" onClick={this.prevCarouselImage} disabled={!this.state.currentCarouselImage}>
            <img src={arrow} alt="anterior"></img>
          </button>
          <img className="carousel__image--item carousel__image--1"
            src={this.props.images[this.state.currentCarouselImage].src}
            alt={this.props.images[this.state.currentCarouselImage].title}>
          </img>
          <button className="meta-slide__button next" onClick={this.nextCarouselImage} disabled={this.state.currentCarouselImage === this.props.images.length - 1}>
            <img src={arrow} alt="siguiente"></img>
          </button>
        </div>
      </div>
    )
  }
}


export default CarouselImage;