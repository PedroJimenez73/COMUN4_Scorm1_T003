import React from 'react';

class Cloud extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="cloud__container"
      style={this.props.position ? {gridArea: this.props.position}: null}>
        <div className="item item--main" key={`cloud-item-0`}>
          <p className="text">{this.props.cloud.find(c => (c.row + c.column) == 0).text}</p>
        </div>
        {this.props.cloud.filter(c => (c.row + c.column) != 0).map((c, i) => {
          return <p className="text item" key={`cloud-item-${i + 1}`}
              style={{gridArea: `${c.row} / ${c.column} / ${c.row + 1} / ${c.column + 1}`}}>
                {c.text}
            </p>
        })}
      </div>
    );
  }
}


export default Cloud;