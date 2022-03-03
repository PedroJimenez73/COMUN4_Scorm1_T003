import React from 'react';

class Paragraph extends React.Component {

  render(){
      return (
          <p className="text" 
            style={this.props.position ? {gridArea: this.props.position}: null}
              dangerouslySetInnerHTML={{ __html: this.props.text}}>
          </p>
      )
  }
}

export default Paragraph;