import React from 'react';
import withScorm from '../lib/withScorm';
import autoBind from 'react-autobind';
import question from '../img/icons/question.png'

class TextQuizz extends React.Component {
    constructor(props) {
        super(props);
        const value = (this.props.scorm.values[this.props.guid] || { value: '' }).value;
        this.state = {
            isTrue: null,
            value: value,
          };
        autoBind(this);
    }

    render(){

    return (
        <div className="question__container"
        style={this.props.position ? {gridArea: this.props.position}: null}>
             <img className="question__img" src={ question } alt="Interrogación"/>
            <p className="text text--enunciate">{ this.props.enunciate }</p>
            <form className="form-text">
                <textarea className="text" type='text' placeholder={ this.props.ask }
                          onBlur={(e) => {this.props.updateValue(this.props.guid, e.currentTarget.value); this.setState({isTrue: this.props.isTrue, value: e.currentTarget.value}) }}>
                    {this.state.value}
                </textarea>       
            </form>
      </div>
    );
    }
};


export default TextQuizz;