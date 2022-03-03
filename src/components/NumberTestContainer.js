import React from 'react';
import NumberTest from './NumberTest';
import styled from 'styled-components';
import question from '../img/icons/question.png'

const NumberTestDivContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
class NumberTestContainer extends React.Component {
    values = {}
    constructor(props) {
        super(props);
        const values = !!props.scorm.values[props.guid] && !!props.scorm.values[props.guid].value
            ? JSON.parse(props.scorm.values[props.guid].value)
            : {};
        props.children.forEach(c => {
            this.values[c.key] = values[c.key] || c.defaultValue
        });
    }

    updateValue(key, value) {
        this.values[key] = value;
        this.props.updateValue(this.props.guid, JSON.stringify(this.values));
    }

    render() {
        return (
            <NumberTestDivContainer
            className="question__container"
            style={this.props.position ? {gridArea: this.props.position}: null}>
                {this.props.children.map(c => <NumberTest scorm={this.props.scorm} key={c.key} defaultValue={this.values[c.key]} range={c.range} guid={c.key} enunciate={c.enunciate} onChange={value => { this.updateValue(c.key, value) }} />)}
            </NumberTestDivContainer>
        );
    }
}

export default NumberTestContainer;