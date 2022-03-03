import React from 'react';
import autoBind from 'react-autobind';

class EvaluationCheckbox extends React.Component {
    constructor(props) {
        super(props);
        const value = (this.props.scorm.values[this.props.guid] || { value: '' }).value;
        this.state = {
            isTrue: null,
            value: value,
            puntuation: '',
        };
        autoBind(this);
    }

    updateCheckValue(value) {
        let values = ((this.state.value || '').split(/,/) || []);
        if (!values.includes(value)) {
          values.push(value);
        } else {
          values = values.filter(v => v !== value && !!v);
        }
        values = values.join(',').replace(/^,/, '');
        this.setState({ value: values });
        this.props.onChange(values);
      }

    render() {
        let responses = this.props.questions;
        return (
            <div className="evaluation__container evaluation__container--evaluation">
                <p className="text text--enunciate"><b>{this.props.enunciate}</b></p>
                <form className="form-radio">
                    {responses.map(responseObj =>
                        <label className="text">
                            <input type="checkbox"
                                checked={!!this.state.value.match(responseObj.key)}
                                name={this.props.key}
                                value={responseObj.key}
                                onChange={(e) => { this.updateCheckValue(responseObj.key) }} />
                            {responseObj.response}
                        </label>
                    )}
                </form>
            </div>
        );
    }
};


export default EvaluationCheckbox;