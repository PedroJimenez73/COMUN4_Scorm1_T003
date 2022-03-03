import React from 'react';
import ApiService from '../services/ApiServices';

class Valoration extends React.Component {
    constructor(props) {
        super(props);
        let value = (this.props.scorm.values[this.props.guid] || { value: JSON.stringify({ evaluation: 0, comments: '' }) }).value;
        value = JSON.parse(value);
        this.state = {
            evaluation: value.evaluation,
            comments: value.comments
        };
    }

    select(rating) {
        this.setState({ comments: this.state.comments, evaluation: rating });
        this.updateValue();
    }

    updateComment(text) {
        this.setState({ comments: text, evaluation: this.state.evaluation });
        this.updateValue();
    }

    updateValue() {
        setTimeout(() => {
            this.props.updateValue(this.props.guid, JSON.stringify(this.state));
            new ApiService().updateSurveys(this.props.guid, this.state.evaluation, this.state.comments);
        }, 150);
    }

    render() {
        return (
            <div className="valoration__container"
            style={this.props.position ? {gridArea: this.props.position}: null}>
                <div className="star-rating__container">
                    <p className="text">Puntúa este SCORM</p>
                    <div className='star-rating'>
                        {[...Array(this.props.stars)].map((id, idx) => (<span className={`star ${idx < this.state.evaluation ? 'selected' : ''}`} key={idx} onClick={() => this.select(idx + 1)}>★</span>))}
                    </div>
                </div>

                <div className="question__container">
                    <p className="text text--enunciate">{this.props.title}</p>
                    <form className="form-text">
                        <textarea className="text" type='text' placeholder={this.props.placeholder}
                            onBlur={(e) => this.updateComment(e.target.value)}>
                            {this.state.comments}
                        </textarea>
                    </form>
                </div>
                <button type="button" className='evaluation__button' onClick={() => this.updateValue()}>Guardar</button>
            </div>
        );
    }
};


export default Valoration;
