import React, { Component, Fragment, Suspense, lazy } from 'react';

class Subtitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
      return (
          <h3 className="subtitle"
          style={this.props.position ? {gridArea: this.props.position}: null}>{this.props.text}</h3>
      )
  }
}

export default Subtitle;