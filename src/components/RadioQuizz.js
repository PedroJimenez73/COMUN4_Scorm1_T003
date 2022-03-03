import React from 'react';
import withScorm from '../lib/withScorm';
import autoBind from 'react-autobind';
import question from '../img/icons/question.png'
import parse from 'html-react-parser';

class RadioQuizz extends React.Component {
    constructor(props) {
        super(props);
        const value = (this.props.scorm.values[this.props.guid] || { value: null }).value;
        this.state = {
            isTrue: this.props.responses.find(r => r.isTrue && r.value == value),
            value: value,
        };
        autoBind(this);
    }

    render() {
        let responses = this.props.responses;

        return (
            <div className="question__container"
            style={this.props.position ? {gridArea: this.props.position}: null}>
                <img className="question__img" src={question} alt="Interrogación" />
                <p className="text text--enunciate">{this.props.enunciate}</p>
                <form className="form-radio">
                    {responses.map(responseObj => {
                        return (<label className="text">
                            <input checked={this.state.value == responseObj.value ? true : false}
                                type="radio"
                                name={responseObj.name}
                                value={responseObj.value}
                                onChange={() => { this.props.updateValue(this.props.guid, responseObj.value); this.setState({ isTrue: responseObj.isTrue, value: responseObj.value }) }} />
                            {responseObj.response}
                        </label>)
                    })}
                </form>
                <div className={this.state.value != '' ? "feedback__container" : 'hidden'}>
                    {Object.entries(responses).map(([key, responseObj]) =>
                    (this.state.value == responseObj.value ?
                        <div className={this.state.isTrue ? 'text feedback feedback--correct' : 'text feedback feedback--incorrect'}>
                            {/* {this.state.isTrue ? '¡Correcto!': 'Falso'} {responseObj.feedback} */}
                            {parse(responseObj.feedback)}
                        </div>
                        : '')
                    )}
                </div>
            </div>
        );
    }
};


export default RadioQuizz;