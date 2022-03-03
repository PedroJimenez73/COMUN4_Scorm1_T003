import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="frontpage__image">
        <div className="text__container">
          <h2 className="title">{this.props.degree}</h2>
          <h3 className="subtitle">{this.props.subject}</h3>
          <h1 className="main-title">{this.props.title}</h1>
          <p className="frontpage-credits">{this.props.credits}</p>
          <h3 className="teacher">{this.props.teacher}</h3>
        </div>
      </div>
    );
  }
}

export default Home;
