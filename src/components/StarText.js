import React from 'react';
import withScorm from '../lib/withScorm';
import autoBind from 'react-autobind';
import question from '../img/icons/question.png'

class StarText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTrue: null,
            value: '',
          };
        autoBind(this);
    }

    render(){

        let { handleInputValue } = this.props.sco;

    return (
        <div className="question__container">
            <p className="text text--enunciate">Coméntanos qué mejorarías</p>
            <form className="form-text">
                <textarea className="text" type='text' placeholder={ this.props.ask }
                          onChange={(e) => {handleInputValue(this.props.name, e.currentTarget.value); this.setState({isTrue: this.props.isTrue, value: e.currentTarget.value}) }}>
                    {this.props.answer}
                </textarea>       
            </form>
      </div>
    );
    }
};


export default withScorm()(StarText);