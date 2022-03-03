import React, { Component } from "react";
import PropTypes from "prop-types";

class TitleBoxSection extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  toggleTable = () => {
    this.props.onClick(this.props.label);
  };

  render() {
    const { toggleTable, props: { isOpen, label } } = this;

    return (
        <>
            <div className="tb-title__container "> 
                <h4 onClick={toggleTable} className={isOpen ? 'tb-title tb-title--selected' : 'tb-title'}>
                    {label}        
                </h4>
            </div>
            <div className="">
                <div className={ isOpen ? 'tb-content' : 'hidden' }>
                    <div className="text">
                        {this.props.children}
                    </div>
                    <div className="tb-img__container">
                        <img className="tb-img" src={ this.props.image } alt=""></img>
                    </div>
                </div>
            </div>
        </>
    );
  }
}

export default TitleBoxSection;
