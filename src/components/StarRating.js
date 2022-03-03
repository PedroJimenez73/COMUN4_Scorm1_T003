import React from 'react';
import PropTypes from 'prop-types';
import withScorm from '../lib/withScorm';

class StarRating extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rating: Math.floor(props.rating)
      }
    }
    
    static propTypes = {
      numStars: PropTypes.number,
      rating: PropTypes.number,
      handleClick: PropTypes.func.isRequired
    }
  
    static defaultProps = {
      numStars: 5,
    }
  
    render() {
      const { numStars } = this.props
      const { rating } = this.state
      let { handleInputValue } = this.props.sco;

      const setState = ()=>{
        if(this.state.rating !==this.props.positionValue ){
          this.state.rating = this.props.positionValue
          this.setState({rating: this.props.positionValue})
        }
     
      }
    
      setState()
    

     const select = (rating) => () => {
        this.state.rating=(rating)
        this.setState({ rating })
        handleClick()
      }
  
      const handleClick = () => {
          handleInputValue(this.props.name, this.state.rating)
      }

      return (
        <div className='star-rating'>
          {[...Array(numStars)].map((id, idx) => (<span className={`star ${ idx < rating ? 'selected': ''}`} key={idx} name={this.props.name} onClick={select( idx + 1)}>★</span>))}
        </div>
      )
    }
  }
  
  export default withScorm()(StarRating)
