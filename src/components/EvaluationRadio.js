import React from 'react';
import withScorm from '../lib/withScorm';
import autoBind from 'react-autobind';

class EvaluationRadio extends React.Component {
    constructor(props) {
        super(props);
        const value = (this.props.scorm.values[this.props.guid] || { value: '' }).value;
        const selection = (this.props.questions.find(q => q.key === value) || {isTrue: false, puntuation: 0});
        this.state = {
            isTrue: selection.isTrue,
            value: value,
            puntuation: selection.puntuation,
          };
        autoBind(this);
    }

    

    render(){
        let responses = this.props.questions;
        
    return (
        <>
        <div className="evaluation__container evaluation__container--evaluation">
            <p className="text text--enunciate"><b>{ this.props.enunciate }</b></p>
            <form className="form-radio">
                {responses.map(responseObj =>
                    <label className="text">
                        <input type="radio" 
                            checked={ this.state.value === responseObj.key} 
                            name={this.props.key} 
                            value={responseObj.key} 
                            onChange={() => {this.props.onChange(responseObj.key); this.setState({isTrue: responseObj.isTrue, value: responseObj.key})}}/>
                        {responseObj.response}
                    </label>
                )}
            </form>
      </div>      
      </>);
    }
};


export default withScorm()(EvaluationRadio);