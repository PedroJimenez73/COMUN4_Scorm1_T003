import React from 'react';
import withScorm from '../lib/withScorm';
import autoBind from 'react-autobind';


class NumberTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: Number(this.props.defaultValue),
            min: Number(this.props.range.split(',')[0]),
            max: Number(this.props.range.split(',')[1])
        };
    }

    updateValue(value){
        this.setState({ value: Number(value) })
        this.props.onChange(Number(value)); 
    }

    render() {

        return (
            <div className="form-numbertest__container">
                <p className="text">{this.props.enunciate}</p>
                <form className="form-numbertest">
                    <label className="text">
                        <div className="numbertest__range">
                            <span>{this.state.min}</span>
                            <input min={this.state.min} max={this.state.max} type="range" value={this.state.value} onChange={(e) => { this.updateValue(e.currentTarget.value) }} name={this.props.guid} />
                            <span>{this.state.max}</span>
                        </div>
                    </label>
                </form>
            </div>
        );
    }
};

export default NumberTest;