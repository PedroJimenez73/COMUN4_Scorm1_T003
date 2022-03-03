import React, { Component } from "react";
import PropTypes from "prop-types";

class AccordionSection extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  toggleAccordion = () => {
    this.props.onClick(this.props.label);
  };

  render() {
    const { toggleAccordion, props: { isOpen, label } } = this;

    return (
      <div className="accordion__section">
        <div onClick={toggleAccordion} className="subtitle">
          {label}
          
            <div id="close" className="accordion__close"> 
                <span className={ isOpen ? 'bar first-bar--opened' : 'bar first-bar' }></span>
                <span className='bar third-bar'></span>
            </div>
        
        </div>
        
          <div className={ isOpen ? 'accordion__text accordion__text--slide-down' : 'accordion__text accordion__text--slide-up' } onClick={toggleAccordion}>
            <div>
              {this.props.children}
            </div>
          </div>
      
      </div>
    );
  }
}

export default AccordionSection;
